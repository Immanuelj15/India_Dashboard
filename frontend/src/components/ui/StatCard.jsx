import React from 'react';
import { TrendingUp, TrendingDown, Minus, Award, Trophy, ChevronRight } from 'lucide-react';
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
  // Rank badge styling logic (Top 10 = Emerald, Top 50 = Sky Blue, 50+ = Amber)
  const getRankBadgeStyle = (r) => {
    if (!r) return 'bg-slate-100 text-slate-600 border-slate-200';
    if (r <= 10) return 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs';
    if (r <= 50) return 'bg-sky-50 text-sky-700 border-sky-200 shadow-xs';
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  // Progress Bar Percentage (Assuming 190 countries benchmark)
  const rankPercentile = rank ? Math.max(5, Math.min(100, Math.round(((190 - rank) / 190) * 100))) : 0;

  return (
    <div className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200">
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
            {category}
          </span>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span>{flagEmoji}</span>
            <span>{countryName}</span>
          </div>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>

      {/* Main Metric & Rank Section */}
      <div className="my-4 pt-3.5 border-t border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          {rank !== undefined && rank !== null ? (
            <div>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Global Rank</div>
              <div className="text-3xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                <span className="text-sky-600 text-2xl font-bold">#</span>
                <span>{rank}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Global Index</div>
              <div className="text-2xl font-bold text-slate-900">—</div>
            </div>
          )}

          {value !== undefined && value !== null && (
            <div className="text-right">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Metric Value</div>
              <div className="text-xl font-bold text-slate-800 font-mono">
                {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs text-slate-500 font-sans font-normal">{unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Visual Benchmark Bar */}
        {rank !== undefined && rank !== null && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
              <span>Relative Position</span>
              <span>Top {100 - rankPercentile}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-600 to-sky-400 transition-all duration-500"
                style={{ width: `${rankPercentile}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Trend & Source Attribution Footer */}
      <div className="space-y-2 pt-2.5 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-600">
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
            {trend === 'stable' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
            <span className={trend === 'down' ? 'text-rose-600' : 'text-emerald-600'}>
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
