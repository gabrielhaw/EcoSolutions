"use client";

import { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: DashboardFilters) => void;
}

export interface DashboardFilters {
  boxType: string;
  occupancyStatus: string;
  dateRange: string;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<DashboardFilters>({
    boxType: '',
    occupancyStatus: '',
    dateRange: 'all'
  });

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      boxType: '',
      occupancyStatus: '',
      dateRange: 'all'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <h3 className="text-lg font-bold text-neutral-900 mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Box Type Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Box Type
          </label>
          <select 
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => handleFilterChange('boxType', e.target.value)}
            value={filters.boxType}
          >
            <option value="">All Types</option>
            <option value="nursery">Nursery Bat Box</option>
            <option value="slimline">Slimline Bat Box</option>
            <option value="rocket">Rocket Bat Box</option>
            <option value="batbank">Bat Bank</option>
          </select>
        </div>

        {/* Occupancy Status Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Occupancy Status
          </label>
          <select 
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => handleFilterChange('occupancyStatus', e.target.value)}
            value={filters.occupancyStatus}
          >
            <option value="">All Status</option>
            <option value="occupied">Occupied</option>
            <option value="unoccupied">Unoccupied</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Date Range
          </label>
          <select 
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            value={filters.dateRange}
          >
            <option value="all">All Time</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="180">Last 6 Months</option>
            <option value="365">Last Year</option>
          </select>
        </div>

        {/* Reset Button */}
        <button 
          className="w-full px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-lg transition-colors"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
