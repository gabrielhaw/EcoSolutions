#!/bin/bash
# Bat Box Data Verification Script
# Calculates accurate statistics from CSV with proper deduplication

CSV_FILE="data/batdata.csv"
TEMP_DIR=$(mktemp -d)

echo "=== BAT BOX DATA VERIFICATION ==="
echo "Processing CSV with deduplication (most recent record per box)..."
echo ""

# Step 1: Extract all records with headers
awk -F';' 'NR==2 {print} NR>2 {print}' "$CSV_FILE" > "$TEMP_DIR/all_records.csv"

# Step 2: Deduplicate by Site Number (keep most recent)
# For records WITH Site Number: sort by site number and date, keep last (most recent)
awk -F';' 'NR==1 {print; next} $17 != "" {print}' "$TEMP_DIR/all_records.csv" | \
  sort -t';' -k17,17 -k1,1r | \
  awk -F';' '!seen[$17]++' > "$TEMP_DIR/unique_with_site.csv"

# For records WITHOUT Site Number: use location+coords as key
awk -F';' 'NR==1 {print; next} $17 == "" {print}' "$TEMP_DIR/all_records.csv" | \
  sort -t';' -k16,16 -k13,13 -k14,14 -k1,1r | \
  awk -F';' '!seen[$16"_"$13"_"$14]++' > "$TEMP_DIR/unique_without_site.csv"

# Combine (skip header from second file)
cat "$TEMP_DIR/unique_with_site.csv" > "$TEMP_DIR/unique_all.csv"
awk 'NR>1' "$TEMP_DIR/unique_without_site.csv" >> "$TEMP_DIR/unique_all.csv"

# Count unique boxes
TOTAL_UNIQUE=$(awk 'NR>1' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
echo "✓ Total Unique Boxes: $TOTAL_UNIQUE"

# Occupancy classification (positive labels)
OCCUPIED=$(awk -F';' 'NR>1 && ($26 ~ /Superb|Pretty good|Moderate occupancy|Great occupancy|Some occupancy|Good occupancy/)' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
OCCUPANCY_RATE=$(echo "scale=1; ($OCCUPIED * 100) / $TOTAL_UNIQUE" | bc)
echo "✓ Occupied Boxes: $OCCUPIED"
echo "✓ Occupancy Rate: $OCCUPANCY_RATE%"

echo ""
echo "=== BOX TYPE DISTRIBUTION ==="
awk -F';' 'NR>1 {print $18}' "$TEMP_DIR/unique_all.csv" | sort | uniq -c | sort -rn | while read count type; do
  occupied=$(awk -F';' -v t="$type" 'NR>1 && $18==t && ($26 ~ /Superb|Pretty good|Moderate occupancy|Great occupancy|Some occupancy|Good occupancy/)' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
  occ_rate=$(echo "scale=1; ($occupied * 100) / $count" | bc)
  echo "$type: $count boxes, $occupied occupied ($occ_rate%)"
done

echo ""
echo "=== WATER DISTANCE OCCUPANCY ==="
for range in "0 - 50m" "50 - 500m" "500 - 1km" "1km or more"; do
  count=$(awk -F';' -v r="$range" 'NR>1 && $22==r' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
  if [ "$count" -gt 0 ]; then
    occupied=$(awk -F';' -v r="$range" 'NR>1 && $22==r && ($26 ~ /Superb|Pretty good|Moderate occupancy|Great occupancy|Some occupancy|Good occupancy/)' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
    occ_rate=$(echo "scale=1; ($occupied * 100) / $count" | bc)
    echo "$range: $count boxes, $occupied occupied ($occ_rate%)"
  fi
done

echo ""
echo "=== NEIGHBOR DISTANCE OCCUPANCY ==="
for range in "0 - 100m" "100 - 500m" "500m - 2km" "2km or more"; do
  count=$(awk -F';' -v r="$range" 'NR>1 && $23==r' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
  if [ "$count" -gt 0 ]; then
    occupied=$(awk -F';' -v r="$range" 'NR>1 && $23==r && ($26 ~ /Superb|Pretty good|Moderate occupancy|Great occupancy|Some occupancy|Good occupancy/)' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
    occ_rate=$(echo "scale=1; ($occupied * 100) / $count" | bc)
    echo "$range: $count boxes, $occupied occupied ($occ_rate%)"
  fi
done

echo ""
echo "=== VEGETATION TYPE OCCUPANCY ==="
awk -F';' 'NR>1 {print $24}' "$TEMP_DIR/unique_all.csv" | sort | uniq | while read veg; do
  if [ ! -z "$veg" ]; then
    count=$(awk -F';' -v v="$veg" 'NR>1 && $24==v' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
    occupied=$(awk -F';' -v v="$veg" 'NR>1 && $24==v && ($26 ~ /Superb|Pretty good|Moderate occupancy|Great occupancy|Some occupancy|Good occupancy/)' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
    occ_rate=$(echo "scale=1; ($occupied * 100) / $count" | bc)
    echo "$veg: $count boxes, $occupied occupied ($occ_rate%)"
  fi
done

echo ""
echo "=== TOP LOCATIONS (by box count) ==="
# Group by location, count unique boxes
awk -F';' 'NR>1 {loc=$16; gsub(/^[[:space:]]+|[[:space:]]+$/, "", loc); print loc}' "$TEMP_DIR/unique_all.csv" | \
  sort | uniq -c | sort -rn | head -10 | while read count location; do
  occupied=$(awk -F';' -v l="$location" 'NR>1 && $16 ~ l && ($26 ~ /Superb|Pretty good|Moderate occupancy|Great occupancy|Some occupancy|Good occupancy/)' "$TEMP_DIR/unique_all.csv" | wc -l | tr -d ' ')
  occ_rate=$(echo "scale=1; ($occupied * 100) / $count" | bc)
  echo "$location: $count boxes, $occupied occupied ($occ_rate%)"
done

echo ""
echo "=== COMPARISON TO CURRENT DASHBOARD ==="
echo "Dashboard shows: 434 total boxes"
echo "Actual unique: $TOTAL_UNIQUE boxes"
echo "Difference: $((434 - TOTAL_UNIQUE)) boxes (likely duplicates from multiple service visits)"
echo ""
echo "Dashboard shows: 234 occupied (53.9%)"
echo "Actual: $OCCUPIED occupied ($OCCUPANCY_RATE%)"

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "=== RECOMMENDATION ==="
echo "⚠️  Update bat-analytics.json with these corrected values"
echo "⚠️  The current data is counting service records, not unique boxes"
echo "✓ Use this script's output to generate accurate analytics"
