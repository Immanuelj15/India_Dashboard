import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SourceBadge } from './SourceBadge';

export const StatCard = ({
  title,
  category,
  rank,
  value,
  unit = '',
  trend = 'up',
  trendText = 'Consolidated 2024 Record',
  sourceName,
  sourceUrl,
  lastUpdated,
  description,
  flagEmoji = '🇮🇳',
  countryName = 'India',
}) => {
  const rankPercentile = rank ? Math.max(5, Math.min(100, Math.round(((190 - rank) / 190) * 100))) : 0;

  return (
    <div className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group bg-white border-2 border-slate-300 shadow-sm hover:border-sky-500 hover:shadow-md transition-all duration-200">
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-950 border border-sky-300">
            {category}
          </span>

          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
            <span>{flagEmoji}</span>
            <span>{countryName}</span>
          </div>
        </div>

        <h3 className="text-base font-black text-slate-950 group-hover:text-sky-700 transition-colors line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-slate-800 mt-1 line-clamp-2 leading-relaxed font-bold">
            {description}
          </p>
        )}
      </div>

      {/* Main Metric & Rank Section */}
      <div className="my-4 pt-3.5 border-t-2 border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          {rank !== undefined && rank !== null ? (
            <div>
              <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Global Rank</div>
              <div className="text-3xl font-black text-slate-950 tracking-tight flex items-baseline gap-1">
                <span className="text-sky-700 text-2xl font-black">#</span>
                <span>{rank}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Global Index</div>
              <div className="text-2xl font-black text-slate-950">—</div>
            </div>
          )}

          {value !== undefined && value !== null && (
            <div className="text-right">
              <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Metric Value</div>
              <div className="text-xl font-black text-slate-950 font-mono">
                {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs text-slate-800 font-sans font-extrabold">{unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Visual Benchmark Bar */}
        {rank !== undefined && rank !== null && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-900">
              <span>Relative Position</span>
              <span className="text-sky-800 font-black">Top {100 - rankPercentile}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-sky-600 to-emerald-600 transition-all duration-500"
                style={{ width: `${rankPercentile}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Trend & Source Attribution Footer */}
      <div className="space-y-2 pt-2.5 border-t-2 border-slate-100">
        <div className="flex items-center justify-between text-xs font-black">
          <div className="flex items-center gap-1.5 text-emerald-800">
            {trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-700" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-700" />}
            {trend === 'stable' && <Minus className="w-4 h-4 text-slate-600" />}
            <span className={trend === 'down' ? 'text-rose-800' : 'text-emerald-800'}>
              {trendText}
            </span>
          </div>
        </div>

        <SourceBadge
          sourceName={sourceName}
          sourceUrl={sourceUrl}
          lastUpdated={lastUpdated}
        />
      </div>
    </div>
  );
};
