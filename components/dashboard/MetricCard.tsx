"use client";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; isPositive: boolean };
  icon?: React.ReactNode;
}

export default function MetricCard({ title, value, subtitle, trend, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:border-emerald-300 transition-all duration-200 flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-neutral-500 truncate" title={subtitle}>{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
              trend.isPositive ? 'text-emerald-600' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-neutral-500">vs last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
