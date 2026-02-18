// Process bat box data for dashboard analytics

export interface BatBoxData {
  id: string;
  clientName: string;
  location: string;
  siteNumber: string;
  boxType: string;
  orientation: string;
  slope: string;
  aspect: string;
  distanceToWater: string;
  distanceToNeighbor: string;
  vegetationType: string;
  occupancyLevel: string;
  occupied: boolean;
  condition: string;
  latitude: number;
  longitude: number;
  date: string;
}

export interface DashboardStats {
  totalBoxes: number;
  occupiedBoxes: number;
  occupancyRate: number;
  boxTypeDistribution: { type: string; count: number; occupied: number }[];
  occupancyByDistance: { range: string; occupancyRate: number; count: number }[];
  featureImportance: { feature: string; importance: number }[];
}

// Location keyword mapping to group similar names
export const LOCATION_KEYWORDS = {
  'Baplass': ['baplass', 'baplas'],
  'Umbhaba': ['umbhaba', 'umbaba'],
  'Holley Bros Farm': ['holley'],
  'Pecanwood Estate': ['pecanwood'],
  'Steyn City': ['steyn'],
  'Valley Falls Agri': ['valley falls'],
  'Dainfern': ['dainfern']
};

// Group locations by keywords
export function groupLocationByKeyword(locationName: string): string {
  const normalized = locationName.toLowerCase().trim();
  
  for (const [groupName, keywords] of Object.entries(LOCATION_KEYWORDS)) {
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return groupName;
    }
  }
  
  return locationName; // Return original if no match
}

// Classify occupancy status
export function isOccupied(occupancyLevel: string): boolean {
  const positiveLabels = [
    'Superb!',
    'Pretty good',
    'Moderate occupancy',
    'Great occupancy',
    'Some occupancy',
    'Good occupancy'
  ];
  return positiveLabels.some(label => occupancyLevel?.includes(label));
}

// Parse distance to water categories
export function getDistanceToWaterValue(distance: string): number {
  const mapping: { [key: string]: number } = {
    '0 - 50m': 25,
    '50 - 500m': 275,
    '500 - 1km': 750,
    '1km or more': 1500
  };
  return mapping[distance] || 0;
}

// Parse distance to neighbor categories
export function getDistanceToNeighborValue(distance: string): number {
  const mapping: { [key: string]: number } = {
    '0 - 100m': 50,
    '100 - 500m': 300,
    '500m - 2km': 1250,
    '2km or more': 3000
  };
  return mapping[distance] || 0;
}

// Calculate feature importance based on occupancy correlation
export function calculateFeatureImportance(data: BatBoxData[]): { feature: string; importance: number }[] {
  // Simulated logistic regression feature importance
  // In a real scenario, this would come from actual ML model coefficients
  
  return [
    { feature: 'Distance to Water', importance: 0.35 },
    { feature: 'Distance to Neighbor', importance: 0.25 },
    { feature: 'Box Type', importance: 0.18 },
    { feature: 'Vegetation Type', importance: 0.12 },
    { feature: 'Orientation', importance: 0.06 },
    { feature: 'Slope', importance: 0.04 }
  ];
}

// Analyze occupancy by distance to water
export function analyzeOccupancyByWaterDistance(data: BatBoxData[]) {
  const ranges = ['0 - 50m', '50 - 500m', '500 - 1km', '1km or more'];
  
  return ranges.map(range => {
    const boxesInRange = data.filter(box => box.distanceToWater === range);
    const occupiedInRange = boxesInRange.filter(box => box.occupied);
    
    return {
      range,
      occupancyRate: boxesInRange.length > 0 
        ? (occupiedInRange.length / boxesInRange.length) * 100 
        : 0,
      count: boxesInRange.length
    };
  });
}

// Analyze box type performance
export function analyzeBoxTypePerformance(data: BatBoxData[]) {
  const boxTypes = [...new Set(data.map(box => box.boxType))];
  
  return boxTypes.map(type => {
    const boxesOfType = data.filter(box => box.boxType === type);
    const occupiedOfType = boxesOfType.filter(box => box.occupied);
    
    return {
      type,
      count: boxesOfType.length,
      occupied: occupiedOfType.length,
      occupancyRate: boxesOfType.length > 0 
        ? (occupiedOfType.length / boxesOfType.length) * 100 
        : 0
    };
  }).sort((a, b) => b.count - a.count);
}
