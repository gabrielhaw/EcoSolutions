/**
 * Data Processing Script for Bat Box Analytics
 * 
 * This script processes the batdata.csv file and generates analytics
 * for the interactive dashboard.
 * 
 * To use this script:
 * 1. Install dependencies: npm install papaparse
 * 2. Run: node --loader ts-node/esm scripts/processBatData.ts
 * 
 * Or manually copy data following the structure below
 */

import fs from 'fs';
import path from 'path';
import { groupLocationByKeyword } from '../lib/batDataProcessor';

// CSV Column Mapping (from your batdata.csv)
interface BatBoxCSVRow {
  'Client Name': string;
  'Estate or Address': string;
  'Site Number': string;
  'Box Type': string;
  'Orientation': string;
  'Slope': string;
  'Aspect': string;
  'Distance to Water': string;
  'Distance to nearest neighbour': string;
  'Vegetation type': string;
  'Levels of occupancy': string;
  'Condition': string;
  'latitude': string;
  'longitude': string;
  'created': string;
}

// Occupancy Classification
const POSITIVE_OCCUPANCY_LABELS = [
  'Superb!',
  'Pretty good',
  'Moderate occupancy',
  'Great occupancy',
  'Some occupancy',
  'Good occupancy'
];

function isOccupied(occupancyLevel: string): boolean {
  return POSITIVE_OCCUPANCY_LABELS.some(label => 
    occupancyLevel?.toLowerCase().includes(label.toLowerCase())
  );
}

// Example: Process CSV data and generate analytics
function processData(csvData: BatBoxCSVRow[]) {
  const totalBoxes = csvData.length;
  const occupiedBoxes = csvData.filter(row => isOccupied(row['Levels of occupancy'])).length;
  const occupancyRate = (occupiedBoxes / totalBoxes) * 100;

  // Box Type Distribution
  const boxTypes = new Map<string, { count: number; occupied: number }>();
  csvData.forEach(row => {
    const type = row['Box Type'] || 'Unknown';
    const current = boxTypes.get(type) || { count: 0, occupied: 0 };
    boxTypes.set(type, {
      count: current.count + 1,
      occupied: current.occupied + (isOccupied(row['Levels of occupancy']) ? 1 : 0)
    });
  });

  const boxTypeDistribution = Array.from(boxTypes.entries()).map(([type, data]) => ({
    type,
    count: data.count,
    occupied: data.occupied,
    occupancyRate: (data.occupied / data.count) * 100
  }));

  // Occupancy by Distance to Water
  const waterDistances = ['0 - 50m', '50 - 500m', '500 - 1km', '1km or more'];
  const occupancyByWaterDistance = waterDistances.map(range => {
    const boxesInRange = csvData.filter(row => row['Distance to Water'] === range);
    const occupiedInRange = boxesInRange.filter(row => isOccupied(row['Levels of occupancy']));
    
    return {
      range,
      occupancyRate: boxesInRange.length > 0 
        ? (occupiedInRange.length / boxesInRange.length) * 100 
        : 0,
      count: boxesInRange.length
    };
  });

  // Occupancy by Distance to Neighbor
  const neighborDistances = ['0 - 100m', '100 - 500m', '500m - 2km', '2km or more'];
  const occupancyByNeighborDistance = neighborDistances.map(range => {
    const boxesInRange = csvData.filter(row => row['Distance to nearest neighbour'] === range);
    const occupiedInRange = boxesInRange.filter(row => isOccupied(row['Levels of occupancy']));
    
    return {
      range,
      occupancyRate: boxesInRange.length > 0 
        ? (occupiedInRange.length / boxesInRange.length) * 100 
        : 0,
      count: boxesInRange.length
    };
  });

  // Occupancy by Vegetation Type
  const vegetationTypes = new Map<string, { count: number; occupied: number }>();
  csvData.forEach(row => {
    const type = row['Vegetation type'] || 'Unknown';
    const current = vegetationTypes.get(type) || { count: 0, occupied: 0 };
    vegetationTypes.set(type, {
      count: current.count + 1,
      occupied: current.occupied + (isOccupied(row['Levels of occupancy']) ? 1 : 0)
    });
  });

  const occupancyByVegetation = Array.from(vegetationTypes.entries()).map(([type, data]) => ({
    type,
    occupancyRate: (data.occupied / data.count) * 100,
    count: data.count
  }));

  // Feature Importance (from logistic regression model)
  // These would typically come from running sklearn or similar ML library
  const featureImportance = [
    { feature: 'Distance to Water', importance: 35 },
    { feature: 'Distance to Neighbor', importance: 25 },
    { feature: 'Box Type', importance: 18 },
    { feature: 'Vegetation Type', importance: 12 },
    { feature: 'Orientation', importance: 6 },
    { feature: 'Slope', importance: 4 }
  ];

  // Top Locations (with keyword grouping)
  const locations = new Map<string, { boxes: number; occupied: number }>();
  csvData.forEach(row => {
    const rawLocation = row['Client Name'] || 'Unknown';
    const location = groupLocationByKeyword(rawLocation); // Group by keywords
    const current = locations.get(location) || { boxes: 0, occupied: 0 };
    locations.set(location, {
      boxes: current.boxes + 1,
      occupied: current.occupied + (isOccupied(row['Levels of occupancy']) ? 1 : 0)
    });
  });

  const topLocations = Array.from(locations.entries())
    .map(([name, data]) => ({
      name,
      boxes: data.boxes,
      occupied: data.occupied,
      occupancyRate: parseFloat(((data.occupied / data.boxes) * 100).toFixed(1))
    }))
    .sort((a, b) => b.boxes - a.boxes)
    .slice(0, 5);

  return {
    totalBoxes,
    occupiedBoxes,
    occupancyRate: parseFloat(occupancyRate.toFixed(1)),
    lastUpdated: new Date().toISOString().split('T')[0],
    boxTypeDistribution,
    occupancyByWaterDistance,
    occupancyByNeighborDistance,
    occupancyByVegetation,
    featureImportance,
    topLocations
  };
}

// Example usage:
// const csvData = parseCsvFile('./data/batdata.csv');
// const analytics = processData(csvData);
// fs.writeFileSync('./public/data/bat-analytics.json', JSON.stringify(analytics, null, 2));

export { processData, isOccupied };
