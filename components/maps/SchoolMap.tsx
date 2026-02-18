"use client";

import { useState } from "react";

interface School {
  id: number;
  name: string;
  location: string;
  boxes: number;
  type: string;
  year: string;
  coordinates?: { lat: number; lng: number };
}

const SCHOOLS_DATA: School[] = [
  { id: 1, name: "Hilton College", location: "Hilton, KZN", boxes: 12, type: "Bat & Owl", year: "2024" },
  { id: 2, name: "Michaelhouse", location: "Balgowan, KZN", boxes: 8, type: "Bat", year: "2024" },
  { id: 3, name: "Kearsney College", location: "Botha's Hill, KZN", boxes: 15, type: "Bat & Owl", year: "2025" },
  { id: 4, name: "St Anne's Diocesan College", location: "Hilton, KZN", boxes: 10, type: "Owl", year: "2024" },
  { id: 5, name: "Maritzburg College", location: "Pietermaritzburg, KZN", boxes: 14, type: "Bat & Owl", year: "2025" },
  { id: 6, name: "Epworth School", location: "Pietermaritzburg, KZN", boxes: 9, type: "Bat", year: "2024" },
  { id: 7, name: "Wykeham Collegiate", location: "Pietermaritzburg, KZN", boxes: 11, type: "Bat & Owl", year: "2025" },
  { id: 8, name: "Merchiston Preparatory", location: "Pietermaritzburg, KZN", boxes: 6, type: "Owl", year: "2024" },
];

export default function SchoolMap() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [filter, setFilter] = useState<'all' | 'bat' | 'owl'>('all');

  const filteredSchools = SCHOOLS_DATA.filter(school => {
    if (filter === 'all') return true;
    if (filter === 'bat') return school.type.toLowerCase().includes('bat');
    if (filter === 'owl') return school.type.toLowerCase().includes('owl');
    return true;
  });

  const totalBoxes = filteredSchools.reduce((sum, school) => sum + school.boxes, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              School Conservation Projects
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              {filteredSchools.length} schools • {totalBoxes} boxes installed
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('bat')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'bat' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Bat Boxes
            </button>
            <button
              onClick={() => setFilter('owl')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'owl' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Owl Boxes
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="text-sm text-neutral-600 mb-1">Total Schools</p>
            <p className="text-3xl font-bold text-emerald-700">{filteredSchools.length}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-neutral-600 mb-1">Total Boxes</p>
            <p className="text-3xl font-bold text-blue-700">{totalBoxes}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-neutral-600 mb-1">Avg per School</p>
            <p className="text-3xl font-bold text-purple-700">
              {Math.round(totalBoxes / filteredSchools.length)}
            </p>
          </div>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Area - Interactive Visual */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Interactive Map</h3>
          
          {/* Map with South Africa outline */}
          <div className="relative bg-linear-to-br from-blue-100 via-emerald-50 to-blue-100 rounded-xl h-96 overflow-hidden border-2 border-neutral-300">
            {/* South Africa Map SVG Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 1000 800" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                
                {/* Ocean/Water background */}
                <rect width="1000" height="800" fill="#e0f2fe" opacity="0.5"/>
                
                {/* South Africa Country Outline - More accurate shape */}
                <g filter="url(#shadow)">
                  <path
                    d="M 200,250 L 280,220 L 350,210 L 420,200 L 490,210 L 550,220 L 620,240 L 680,270 L 730,310 L 760,350 L 780,400 L 790,450 L 780,500 L 750,550 L 700,580 L 640,600 L 580,610 L 520,610 L 460,600 L 400,580 L 350,560 L 300,530 L 250,490 L 220,440 L 200,390 L 190,340 L 190,290 Z"
                    fill="#d4f4dd"
                    stroke="#10b981"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                  
                  {/* KwaZulu-Natal Province - East Coast */}
                  <path
                    d="M 650,350 L 720,380 L 740,420 L 750,460 L 740,500 L 710,530 L 670,540 L 630,530 L 610,500 L 600,460 L 605,420 L 620,385 Z"
                    fill="#c084fc"
                    stroke="#9333ea"
                    strokeWidth="3"
                    opacity="0.8"
                  />
                </g>
                
                {/* Ocean waves decoration */}
                <path
                  d="M 100,500 Q 150,490 200,500 Q 250,510 300,500"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  opacity="0.3"
                  strokeDasharray="5,5"
                />
                <path
                  d="M 100,550 Q 150,540 200,550 Q 250,560 300,550"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  opacity="0.3"
                  strokeDasharray="5,5"
                />
                
                {/* Compass Rose */}
                <g transform="translate(120, 150)">
                  <circle cx="0" cy="0" r="30" fill="white" opacity="0.9" stroke="#64748b" strokeWidth="2"/>
                  <text x="-3" y="-18" fontSize="12" fontWeight="bold" fill="#64748b">N</text>
                  <text x="-3" y="22" fontSize="10" fill="#64748b">S</text>
                  <text x="18" y="5" fontSize="10" fill="#64748b">E</text>
                  <text x="-25" y="5" fontSize="10" fill="#64748b">W</text>
                  <polygon points="0,-15 -3,0 0,15 3,0" fill="#10b981"/>
                </g>
                
                {/* Province Labels */}
                <text x="400" y="400" fontSize="18" fill="#059669" fontWeight="bold" opacity="0.7">SOUTH AFRICA</text>
                <text x="680" y="450" fontSize="22" fill="#9333ea" fontWeight="bold">KZN</text>
                <text x="480" y="320" fontSize="14" fill="#059669" opacity="0.6">Gauteng</text>
                <text x="350" y="420" fontSize="14" fill="#059669" opacity="0.6">Free State</text>
                <text x="550" y="520" fontSize="14" fill="#059669" opacity="0.6">Eastern Cape</text>
                <text x="400" y="550" fontSize="14" fill="#059669" opacity="0.6">Western Cape</text>
              </svg>
            </div>

            {/* Map markers - distributed in KZN region */}
            <div className="relative h-full p-8">
              {filteredSchools.map((school, idx) => {
                // Position markers in the KZN region (right-center area)
                const positions = [
                  { top: '25%', left: '65%' }, // Hilton area
                  { top: '30%', left: '70%' }, // Balgowan
                  { top: '40%', left: '75%' }, // Coastal area
                  { top: '35%', left: '68%' }, // Hilton area 2
                  { top: '45%', left: '65%' }, // PMB area
                  { top: '38%', left: '72%' }, // PMB area 2
                  { top: '42%', left: '67%' }, // PMB area 3
                  { top: '32%', left: '73%' }, // Between areas
                ];
                const pos = positions[idx % positions.length];
                
                return (
                  <button
                    key={school.id}
                    onClick={() => setSelectedSchool(school)}
                    className="absolute group transition-transform hover:scale-125"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className={`relative ${
                      selectedSchool?.id === school.id ? 'scale-125' : ''
                    }`}>
                      {/* Pulse animation */}
                      <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                        school.type.toLowerCase().includes('owl')
                          ? 'bg-purple-400'
                          : 'bg-emerald-400'
                      }`}></div>
                      
                      {/* Marker */}
                      <div className={`relative w-8 h-8 rounded-full shadow-lg border-2 border-white flex items-center justify-center transition-all ${
                        school.type.toLowerCase().includes('owl')
                          ? 'bg-purple-600'
                          : 'bg-emerald-600'
                      }`}>
                        <span className="text-white text-xs font-bold">{school.boxes}</span>
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="bg-neutral-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                          <p className="font-semibold">{school.name}</p>
                          <p className="text-neutral-300">{school.boxes} boxes</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 space-y-2 border border-neutral-200">
              <p className="text-xs font-bold text-neutral-900 mb-2 uppercase tracking-wide">Legend</p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-600 rounded-full shadow-sm"></div>
                <span className="text-xs font-medium text-neutral-700">Bat Boxes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-600 rounded-full shadow-sm"></div>
                <span className="text-xs font-medium text-neutral-700">Owl Boxes</span>
              </div>
              <div className="pt-2 mt-2 border-t border-neutral-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-200 rounded border border-purple-400"></div>
                  <span className="text-xs font-medium text-neutral-700">KZN Region</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embed actual map option */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900 mb-2 font-medium">Interactive Google Map</p>
            <p className="text-xs text-blue-700 mb-3">
              For a fully interactive map with satellite imagery and directions, view on Google Maps:
            </p>
            <a
              href="https://www.google.com/maps/d/u/0/edit?mid=YOUR_MAP_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* School List */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">School List</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredSchools.map((school) => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedSchool?.id === school.id
                    ? school.type.toLowerCase().includes('owl')
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-emerald-300 bg-emerald-50'
                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900 text-sm">{school.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    school.type.toLowerCase().includes('owl')
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {school.boxes}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mb-1">{school.location}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>{school.type}</span>
                  <span>•</span>
                  <span>{school.year}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected School Detail */}
      {selectedSchool && (
        <div className="bg-linear-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">{selectedSchool.name}</h3>
              <p className="text-neutral-700">{selectedSchool.location}</p>
            </div>
            <button
              onClick={() => setSelectedSchool(null)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/60 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Boxes Installed</p>
              <p className="text-2xl font-bold text-emerald-700">{selectedSchool.boxes}</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Box Type</p>
              <p className="text-2xl font-bold text-emerald-700">{selectedSchool.type}</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Year Installed</p>
              <p className="text-2xl font-bold text-emerald-700">{selectedSchool.year}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
