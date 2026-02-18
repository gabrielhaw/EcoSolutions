"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
  color?: string;
}

export default function BarChartCard({ 
  title, 
  subtitle, 
  data, 
  dataKey, 
  xAxisKey,
  color = "#10b981" 
}: BarChartCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
        {subtitle && <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fill: '#737373', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fill: '#737373', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
