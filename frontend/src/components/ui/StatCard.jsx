import React from 'react';
import { SourceBadge } from './SourceBadge';

export const StatCard = ({
  title,
  category,
  rank,
  value,
  unit = '',
  sourceName,
  sourceUrl,
  lastUpdated,
  description,
  flagEmoji = '🇮🇳',
  countryName = 'India',
}) => {
  const rankPercentile = rank ? Math.max(5, Math.min(100, Math.round(((190 - rank) / 190) * 100))) : 0;

  // Rank badge styling logic
  const getRankBadgeStyle = (r) => {
    if (!r) return 'bg-slate-100 text-slate-700 border-slate-300';
    if (r <= 10) return 'bg-emerald-100 text-emerald-950 border-emerald-400 shadow-2xs';
    if (r <= 50) return 'bg-sky-100 text-sky-950 border-sky-400 shadow-2xs';
    return 'bg-amber-100 text-amber-950 border-amber-300';
  };

  return (
    <div className="glass-panel glass-panel-hover p-4 lg:p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group bg-white border border-slate-300 shadow-xs hover:border-sky-500 hover:shadow-premium transition-all">
      {/* Top Category & Country Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100/90 text-sky-950 border border-sky-300">
            {category}
          </span>

          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-300">
            <span>{flagEmoji}</span>
            <span>{countryName}</span>
          </div>
        </div>

        <h3 className="text-base font-black text-slate-950 group-hover:text-sky-700 transition-colors line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-slate-700 mt-1 line-clamp-2 font-bold leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Main Metric & Rank Section */}
      <div className="my-3.5 pt-3 border-t border-slate-200 space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          {rank !== undefined && rank !== null ? (
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Global Rank</div>
              <div className="text-2xl lg:text-3xl font-black text-slate-950 flex items-baseline gap-0.5 tracking-tight">
                <span className="text-sky-700 text-xl font-black">#</span>
                <span>{rank}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Global Index</div>
              <div className="text-xl font-black text-slate-950">—</div>
            </div>
          )}

          {value !== undefined && value !== null && (
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Metric Value</div>
              <div className="text-lg lg:text-xl font-black text-slate-950 font-mono">
                {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs font-sans text-slate-700 font-bold">{unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Visual Percentile Progress Bar */}
        {rank !== undefined && rank !== null && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-900">
              <span>Relative Position</span>
              <span className="text-sky-800 font-black">Top {100 - rankPercentile}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-sky-600 to-emerald-500 transition-all duration-500 shadow-2xs"
                style={{ width: `${rankPercentile}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Provenance Source Badge Footer */}
      <div className="pt-2 border-t border-slate-200">
        <SourceBadge
          sourceName={sourceName}
          sourceUrl={sourceUrl}
          lastUpdated={lastUpdated}
        />
      </div>
    </div>
  );
};
