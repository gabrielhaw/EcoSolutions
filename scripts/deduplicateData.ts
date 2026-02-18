/**
 * Data Deduplication Script for Bat Box Service Records
 * 
 * This script ensures accurate statistics by:
 * 1. Identifying unique boxes (using Site Number as primary key)
 * 2. For each unique box, selecting the MOST RECENT service record
 * 3. Handling records without Site Numbers using location + coordinates
 * 
 * Run: npx ts-node scripts/deduplicateData.ts
 */

import fs from 'fs';
import path from 'path';

// Read CSV and parse
const csvPath = path.join(process.cwd(), 'data/batdata.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n');
const headers = lines[1].split(';'); // Line 2 has headers

console.log('\n=== BAT BOX DATA DEDUPLICATION ANALYSIS ===\n');
console.log(`Total service records: ${lines.length - 2}`); // Exclude header rows

interface ServiceRecord {
  created: string;
  siteNumber: string;
  location: string;
  latitude: string;
  longitude: string;
  boxType: string;
  orientation: string;
  occupancy: string;
  distanceToWater: string;
  distanceToNeighbor: string;
  vegetation: string;
  condition: string;
  rowIndex: number;
}

// Parse all records
const records: ServiceRecord[] = [];
for (let i = 2; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  const cols = lines[i].split(';');
  records.push({
    created: cols[0] || '',
    siteNumber: cols[16] || '',
    location: cols[15] || '',
    latitude: cols[12] || '',
    longitude: cols[13] || '',
    boxType: cols[17] || '',
    orientation: cols[18] || '',
    occupancy: cols[25] || '',
    distanceToWater: cols[21] || '',
    distanceToNeighbor: cols[22] || '',
    vegetation: cols[23] || '',
    condition: cols[26] || '',
    rowIndex: i
  });
}

console.log(`Parsed records: ${records.length}`);

// Count records with and without Site Numbers
const withSiteNumber = records.filter(r => r.siteNumber.trim() !== '');
const withoutSiteNumber = records.filter(r => r.siteNumber.trim() === '');

console.log(`\nRecords WITH Site Number: ${withSiteNumber.length}`);
console.log(`Records WITHOUT Site Number: ${withoutSiteNumber.length}`);

// Strategy 1: Deduplicate by Site Number (most recent)
const bySiteNumber = new Map<string, ServiceRecord>();
withSiteNumber.forEach(record => {
  const existing = bySiteNumber.get(record.siteNumber);
  if (!existing) {
    bySiteNumber.set(record.siteNumber, record);
  } else {
    // Compare dates to keep most recent
    const existingDate = parseDate(existing.created);
    const recordDate = parseDate(record.created);
    if (recordDate > existingDate) {
      bySiteNumber.set(record.siteNumber, record);
    }
  }
});

console.log(`\nUnique boxes (by Site Number): ${bySiteNumber.size}`);

// Strategy 2: For records without Site Number, use location + coordinates as composite key
const byLocationCoords = new Map<string, ServiceRecord>();
withoutSiteNumber.forEach(record => {
  // Create composite key from location + lat + long (rounded to avoid float precision issues)
  const lat = parseFloat(record.latitude) || 0;
  const lng = parseFloat(record.longitude) || 0;
  const compositeKey = `${record.location.toLowerCase().trim()}_${lat.toFixed(4)}_${lng.toFixed(4)}`;
  
  const existing = byLocationCoords.get(compositeKey);
  if (!existing) {
    byLocationCoords.set(compositeKey, record);
  } else {
    // Keep most recent
    const existingDate = parseDate(existing.created);
    const recordDate = parseDate(record.created);
    if (recordDate > existingDate) {
      byLocationCoords.set(compositeKey, record);
    }
  }
});

console.log(`Unique boxes (without Site Number, by location+coords): ${byLocationCoords.size}`);
console.log(`\nTOTAL UNIQUE BOXES: ${bySiteNumber.size + byLocationCoords.size}`);

// Analyze duplicate detection
console.log('\n=== DUPLICATION ANALYSIS ===');
console.log(`Service records: ${records.length}`);
console.log(`Unique boxes: ${bySiteNumber.size + byLocationCoords.size}`);
console.log(`Average services per box: ${(records.length / (bySiteNumber.size + byLocationCoords.size)).toFixed(2)}`);

// Find boxes with most service visits
const siteNumberCounts = new Map<string, number>();
withSiteNumber.forEach(record => {
  siteNumberCounts.set(record.siteNumber, (siteNumberCounts.get(record.siteNumber) || 0) + 1);
});

const topServiced = Array.from(siteNumberCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

console.log('\n=== BOXES WITH MOST SERVICE VISITS ===');
topServiced.forEach(([siteNum, count]) => {
  const box = bySiteNumber.get(siteNum);
  console.log(`Site ${siteNum}: ${count} visits - ${box?.location || 'Unknown'}`);
});

// Show date range
const dates = records
  .map(r => parseDate(r.created))
  .filter(d => !isNaN(d.getTime()))
  .sort((a, b) => a.getTime() - b.getTime());

if (dates.length > 0) {
  console.log(`\n=== DATE RANGE ===`);
  console.log(`First service: ${formatDate(dates[0])}`);
  console.log(`Last service: ${formatDate(dates[dates.length - 1])}`);
  console.log(`Time span: ${Math.round((dates[dates.length - 1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24))} days`);
}

// Helper functions
function parseDate(dateStr: string): Date {
  // Handle format: "9/10/2024 11:44:57" or "1/29/2026 15:49:11"
  const parts = dateStr.split(' ')[0].split('/');
  if (parts.length === 3) {
    return new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
  }
  return new Date(dateStr);
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Export deduplicated data
console.log('\n=== RECOMMENDATION ===');
console.log('✓ Use Site Number as primary unique identifier');
console.log('✓ For records without Site Number, use Location + Coordinates');
console.log('✓ Always take the MOST RECENT service record for each unique box');
console.log('✓ This gives you accurate occupancy rates based on latest status');
console.log('\nYour actual unique box count is likely:', bySiteNumber.size + byLocationCoords.size);
console.log('This is different from the 434 currently shown in the dashboard.');
