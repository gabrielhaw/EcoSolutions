#!/bin/bash
# Bat Box Data Deduplication Analysis

CSV_FILE="data/batdata.csv"

echo "=== BAT BOX DATA DEDUPLICATION ANALYSIS ==="
echo ""

# Count total records (excluding headers)
TOTAL_RECORDS=$(awk 'NR>2' "$CSV_FILE" | wc -l | tr -d ' ')
echo "Total service records: $TOTAL_RECORDS"

# Count unique Site Numbers (non-empty)
UNIQUE_SITE_NUMBERS=$(awk -F';' 'NR>2 && $17 != "" {print $17}' "$CSV_FILE" | sort -u | wc -l | tr -d ' ')
echo "Unique boxes (with Site Number): $UNIQUE_SITE_NUMBERS"

# Count records without Site Number
NO_SITE_NUMBER=$(awk -F';' 'NR>2 && $17 == "" {count++} END {print count}' "$CSV_FILE")
echo "Records WITHOUT Site Number: $NO_SITE_NUMBER"

# For records without Site Number, estimate unique boxes by location
UNIQUE_LOCATIONS_NO_SITE=$(awk -F';' 'NR>2 && $17 == "" {print $16 "_" $13 "_" $14}' "$CSV_FILE" | sort -u | wc -l | tr -d ' ')
echo "Estimated unique boxes (without Site Number, by location+coords): $UNIQUE_LOCATIONS_NO_SITE"

# Calculate total unique boxes
TOTAL_UNIQUE=$((UNIQUE_SITE_NUMBERS + UNIQUE_LOCATIONS_NO_SITE))
echo ""
echo "=== TOTALS ==="
echo "ACTUAL UNIQUE BOXES: $TOTAL_UNIQUE"
echo "Average services per box: $(echo "scale=2; $TOTAL_RECORDS / $TOTAL_UNIQUE" | bc)"

# Show top serviced boxes (by Site Number)
echo ""
echo "=== BOXES WITH MOST SERVICE VISITS ==="
awk -F';' 'NR>2 && $17 != "" {print $17 ";" $16}' "$CSV_FILE" | sort | uniq -c | sort -rn | head -5 | while read count site_loc; do
  site=$(echo "$site_loc" | cut -d';' -f1)
  loc=$(echo "$site_loc" | cut -d';' -f2)
  echo "Site $site: $count visits - $loc"
done

# Date range
echo ""
echo "=== DATE RANGE ==="
FIRST_DATE=$(awk -F';' 'NR==3 {print $1}' "$CSV_FILE" | cut -d' ' -f1)
LAST_DATE=$(awk -F';' 'END {print $1}' "$CSV_FILE" | cut -d' ' -f1)
echo "First service: $FIRST_DATE"
echo "Last service: $LAST_DATE"

echo ""
echo "=== RECOMMENDATION ==="
echo "✓ Use Site Number as primary unique identifier"
echo "✓ For records without Site Number, use Location + Coordinates"
echo "✓ Always take the MOST RECENT service record for each unique box"
echo "✓ This ensures accurate occupancy rates based on latest status"
echo ""
echo "Your current dashboard shows: 434 boxes"
echo "Actual unique boxes should be: ~$TOTAL_UNIQUE"
