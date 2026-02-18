"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
}

export default function LineChartCard({ 
  title, 
  subtitle, 
  data, 
  dataKeys,
  xAxisKey
}: LineChartCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
        {subtitle && <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fill: '#737373', fontSize: 12 }}
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
          {dataKeys.map((item) => (
            <Line 
              key={item.key}
              type="monotone" 
              dataKey={item.key} 
              stroke={item.color}
              name={item.name}
              strokeWidth={2}
              dot={{ fill: item.color, r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
