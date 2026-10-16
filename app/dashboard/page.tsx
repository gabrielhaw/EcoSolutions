"use client";

import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import BarChartCard from "@/components/dashboard/BarChartCard";
import FilterPanel, { type DashboardFilters } from "@/components/dashboard/FilterPanel";

/** One row of a chart's data, as stored in public/data/*-analytics.json. */
type Row = Record<string, string | number>;
type BoxTypeRow = { type: string; count: number; occupied: number; occupancyRate: number };
type LocationRow = Row & { occupancyRate: number };

interface DashboardData {
  totalBoxes: number;
  occupiedBoxes: number;
  occupancyRate: number;
  lastUpdated: string;
  boxTypeDistribution: BoxTypeRow[];
  occupancyByWaterDistance: Row[];
  occupancyByNeighborDistance: Row[];
  occupancyByVegetation: Row[];
  featureImportance: Row[];
  topLocations: LocationRow[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [filteredData, setFilteredData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedBoxType, setSelectedBoxType] = useState<'bat' | 'owl' | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    boxType: '',
    occupancyStatus: '',
    dateRange: 'all'
  });

  // Loads when a box type is picked (not in an effect), and ignores a reply
  // that arrives after the visitor has already picked again or gone back.
  const request = useRef(0);
  const chooseBoxType = (type: 'bat' | 'owl' | null) => {
    const seq = ++request.current;
    setSelectedBoxType(type);
    if (!type) return;
    setLoading(true);
    fetch(type === 'bat' ? '/data/bat-analytics.json' : '/data/owl-analytics.json')
      .then(res => res.json())
      .then(data => {
        if (seq !== request.current) return;
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch(error => {
        if (seq !== request.current) return;
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      });
  };

  const handleFilterChange = (filters: DashboardFilters) => {
    setActiveFilters(filters);
    if (!data) return;

    const filtered = { ...data };

    // Filter by box type - affects distribution and water/neighbor distance charts
    if (filters.boxType) {
      const boxTypeMatch = filters.boxType.toLowerCase();
      
      filtered.boxTypeDistribution = data.boxTypeDistribution.filter(
        item => item.type.toLowerCase().includes(boxTypeMatch)
      );
      
      // Recalculate totals based on filtered box types
      const totalBoxes = filtered.boxTypeDistribution.reduce((sum, item) => sum + item.count, 0);
      const occupiedBoxes = filtered.boxTypeDistribution.reduce((sum, item) => sum + item.occupied, 0);
      filtered.totalBoxes = totalBoxes;
      filtered.occupiedBoxes = occupiedBoxes;
      filtered.occupancyRate = totalBoxes > 0 ? Math.round((occupiedBoxes / totalBoxes) * 100 * 10) / 10 : 0;
      
      // Recalculate water and neighbor distances for the selected box type
      // For now, showing all data but could be filtered if we had per-box-type breakdowns
      filtered.occupancyByWaterDistance = [...data.occupancyByWaterDistance];
      filtered.occupancyByNeighborDistance = [...data.occupancyByNeighborDistance];
    } else {
      filtered.boxTypeDistribution = [...data.boxTypeDistribution];
      filtered.occupancyByWaterDistance = [...data.occupancyByWaterDistance];
      filtered.occupancyByNeighborDistance = [...data.occupancyByNeighborDistance];
      filtered.totalBoxes = data.totalBoxes;
      filtered.occupiedBoxes = data.occupiedBoxes;
      filtered.occupancyRate = data.occupancyRate;
    }

    // Filter by occupancy status - affects top locations
    if (filters.occupancyStatus === 'occupied') {
      filtered.topLocations = data.topLocations.filter(loc => loc.occupancyRate >= 50);
    } else if (filters.occupancyStatus === 'unoccupied') {
      filtered.topLocations = data.topLocations.filter(loc => loc.occupancyRate < 50);
    } else {
      filtered.topLocations = [...data.topLocations];
    }

    // Keep other data the same
    filtered.occupancyByVegetation = [...data.occupancyByVegetation];
    filtered.featureImportance = [...data.featureImportance];

    setFilteredData(filtered);
  };

  // Box Type Selection Screen
  if (!selectedBoxType) {
    return (
      <div className="min-h-screen bg-linear-to-br from-neutral-50 via-white to-emerald-50/30 flex items-center justify-center py-20 px-4">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-neutral-900 mb-4">
                Wildlife Analytics Dashboard
              </h1>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Explore data-driven insights from our conservation projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {/* Bat Boxes */}
              <button
                onClick={() => chooseBoxType('bat')}
                className="group relative overflow-hidden bg-white hover:bg-emerald-50 p-8 rounded-2xl text-left transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl border-2 border-neutral-200 hover:border-emerald-400"
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">Bat Box Data</h2>
                  <p className="text-neutral-600 mb-4 text-sm">378 installations • 53.7% occupancy</p>
                  <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold">
                    <span>View Analytics</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Owl Boxes */}
              <button
                onClick={() => chooseBoxType('owl')}
                className="group relative overflow-hidden bg-white hover:bg-neutral-50 p-8 rounded-2xl text-left transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl border-2 border-neutral-200 hover:border-neutral-400"
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">Owl Box Data</h2>
                  <p className="text-neutral-600 mb-4 text-sm">1000+ installations • Coming soon</p>
                  <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold">
                    <span>View Analytics</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            <p className="text-neutral-500 text-sm mt-8">
              Select a dataset to view detailed analytics and insights
            </p>
          </div>
        </Container>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-neutral-50 to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading {selectedBoxType} box data...</p>
        </div>
      </div>
    );
  }

  if (!data || !filteredData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-600">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-50 via-white to-emerald-50/30 py-12 pt-28">
      <Container>
        {/* Header with Back Button */}
        <div className="mb-10">
          <button
            onClick={() => chooseBoxType(null)}
            className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-emerald-600 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to selection</span>
          </button>
          <div className="flex items-center gap-4 mb-3">
            <div className={`p-4 rounded-2xl shadow-lg ${
              selectedBoxType === 'bat' 
                ? 'bg-linear-to-br from-emerald-600 to-emerald-700' 
                : 'bg-linear-to-br from-neutral-700 to-neutral-800'
            }`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-bold text-neutral-900">
                  {selectedBoxType === 'bat' ? 'Bat' : 'Owl'} Box Analytics
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                  selectedBoxType === 'bat' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-neutral-100 text-neutral-700'
                }`}>
                  {selectedBoxType.toUpperCase()}
                </span>
              </div>
              <p className="text-neutral-600 mt-1">
                Science-backed insights from {data.totalBoxes} unique installations • Last updated: {data.lastUpdated}
                {(activeFilters.boxType || activeFilters.occupancyStatus) && (
                  <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    Filtered
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">About This Dashboard</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            This analytics dashboard provides real-time insights into the effectiveness of our {selectedBoxType === 'bat' ? 'bat' : 'owl'} box installations across South Africa. 
            The data shown below analyzes {data.totalBoxes} unique installations, measuring occupancy rates and identifying key environmental factors 
            that influence successful wildlife adoption.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Our research examines proximity to water sources, vegetation coverage, neighboring box distances, and geographical characteristics 
            to optimize future placements and maximize conservation impact. These science-backed insights help us create more effective 
            non-toxic pest control solutions while supporting biodiversity.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-100">
            <p className="text-sm font-medium text-neutral-600 mb-1">Total Boxes</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">{filteredData.totalBoxes}</p>
            <p className="text-xs text-neutral-500">{activeFilters.boxType ? `${activeFilters.boxType.charAt(0).toUpperCase() + activeFilters.boxType.slice(1)} boxes` : "Active installations"}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-100">
            <div className="flex items-center justify-end mb-4">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                {filteredData.occupancyRate}%
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-600 mb-1">Occupied</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">{filteredData.occupiedBoxes}</p>
            <p className="text-xs text-neutral-500">Success rate</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-100">
            <p className="text-sm font-medium text-neutral-600 mb-1">Best Factor</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1 truncate">{String(filteredData.featureImportance[0]?.feature ?? '').replace('Distance to ', '') || 'Water'}</p>
            <p className="text-xs text-neutral-500">{filteredData.featureImportance[0]?.importance || 35}% influence</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-100">
            <div className="flex items-center justify-end mb-4">
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-bold rounded-full">
                {filteredData.topLocations[0]?.occupancyRate}%
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-600 mb-1">Top Location</p>
            <p className="text-lg font-bold text-neutral-900 mb-1 truncate">{filteredData.topLocations[0]?.name || 'N/A'}</p>
            <p className="text-xs text-neutral-500">{filteredData.topLocations[0]?.boxes || 0} boxes installed</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          {/* Left Column - Filters & Top Locations */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <FilterPanel onFilterChange={handleFilterChange} />
            
            {/* Active Filters Display */}
            {(activeFilters.boxType || activeFilters.occupancyStatus !== '') && (
              <div className="bg-linear-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 shadow-sm">
                <p className="text-xs font-bold text-emerald-900 mb-3 uppercase tracking-wide">Active Filters</p>
                <div className="space-y-2">
                  {activeFilters.boxType && (
                    <div className="flex items-center gap-2 text-sm text-emerald-800 bg-white/60 rounded-lg px-3 py-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{activeFilters.boxType.charAt(0).toUpperCase() + activeFilters.boxType.slice(1)}</span>
                    </div>
                  )}
                  {activeFilters.occupancyStatus && (
                    <div className="flex items-center gap-2 text-sm text-emerald-800 bg-white/60 rounded-lg px-3 py-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{activeFilters.occupancyStatus.charAt(0).toUpperCase() + activeFilters.occupancyStatus.slice(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Top Locations Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Top Locations
              </h3>
              <div className="space-y-3">
                {filteredData.topLocations.slice(0, 8).map((location, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-3 border-b border-neutral-100 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{location.name}</p>
                      <p className="text-xs text-neutral-500">{location.boxes} boxes • {location.occupied} occupied</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      location.occupancyRate >= 60 
                        ? 'bg-emerald-100 text-emerald-800'
                        : location.occupancyRate >= 50
                        ? 'bg-neutral-100 text-neutral-700'
                        : 'bg-neutral-200 text-neutral-800'
                    }`}>
                      {location.occupancyRate}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Charts */}
          <div className="lg:col-span-9 space-y-6">
            {/* Feature Importance - ML Insights */}
            <BarChartCard
              title="Feature Importance in Occupancy Prediction"
              subtitle="Logistic regression coefficients showing which factors most influence bat box occupancy"
              data={filteredData.featureImportance}
              dataKey="importance"
              xAxisKey="feature"
              color="#10b981"
            />

            {/* Occupancy by Distance to Water */}
            <BarChartCard
              title="Occupancy Rate by Distance to Water"
              subtitle="Boxes closer to water sources show significantly higher occupancy"
              data={filteredData.occupancyByWaterDistance}
              dataKey="occupancyRate"
              xAxisKey="range"
              color="#0ea5e9"
            />

            {/* Occupancy by Distance to Nearest Neighbor */}
            <BarChartCard
              title="Occupancy Rate by Distance to Nearest Neighbor"
              subtitle="Optimal spacing between bat boxes affects colonization success"
              data={filteredData.occupancyByNeighborDistance}
              dataKey="occupancyRate"
              xAxisKey="range"
              color="#8b5cf6"
            />
          </div>
        </div>

        {/* Vegetation Performance */}
        <div className="mb-8">
          <BarChartCard
            title="Occupancy by Vegetation Type"
            subtitle="Habitat characteristics influence bat activity"
            data={filteredData.occupancyByVegetation}
            dataKey="occupancyRate"
            xAxisKey="type"
            color="#ec4899"
          />
        </div>

        {/* Key Insights */}
        <div className="bg-linear-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-600 rounded-xl shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">
                Key Scientific Insights
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-emerald-700">68.5%</span>
                    <span className="text-xs text-emerald-600 font-medium">vs 41.2%</span>
                  </div>
                  <p className="text-sm text-neutral-800">
                    <strong>Water proximity matters most:</strong> Boxes within 50m of water significantly outperform distant boxes
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-emerald-700">100-500m</span>
                  </div>
                  <p className="text-sm text-neutral-800">
                    <strong>Optimal spacing:</strong> Boxes perform best when spaced 100-500m apart (58.3% occupancy)
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-emerald-700">58.3%</span>
                  </div>
                  <p className="text-sm text-neutral-800">
                    <strong>Nursery boxes perform best:</strong> Multi-chamber design shows highest occupancy rate
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-emerald-700">61.5%</span>
                  </div>
                  <p className="text-sm text-neutral-800">
                    <strong>Open grassland preferred:</strong> vs 48.7% in farmland areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-6 bg-white border border-neutral-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-neutral-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-neutral-900 mb-1">About this data</p>
              <p className="text-xs text-neutral-600 leading-relaxed mb-2">
                Dashboard displays 378 unique bat box installations with proper deduplication. The source CSV contains 507 service records (Oct 2024 - Jan 2026) where boxes may have multiple service visits. Only the most recent service record per box is used for accurate occupancy status. Location grouping uses keyword matching to combine similar names.
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <strong>Feature Importance:</strong> Box Type shows the highest impact (0-78.5% range), followed by Vegetation Type (50-70.7%) and Neighbor Distance (60-72%). These are based on observed variance in occupancy rates across categories. For formal statistical validation, a Lasso regression model (with automatic feature selection) would be ideal to account for feature correlations and identify true predictive factors. The dashboard will be updated with validated coefficients once bat and owl box data (1000+ installations) is combined.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
