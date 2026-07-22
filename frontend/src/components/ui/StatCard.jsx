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

  return (
    <div className="glass-panel glass-panel-hover p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden group bg-white border border-slate-300 shadow-xs hover:border-sky-500 hover:shadow-md transition-all">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-950 border border-sky-300">
            {category}
          </span>

          <div className="flex items-center gap-1 text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
            <span>{flagEmoji}</span>
            <span>{countryName}</span>
          </div>
        </div>

        <h3 className="text-sm font-black text-slate-950 group-hover:text-sky-700 transition-colors line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-slate-800 mt-1 line-clamp-2 font-bold leading-snug">
            {description}
          </p>
        )}
      </div>

      {/* Metric & Rank */}
      <div className="my-3 pt-2.5 border-t border-slate-200 space-y-2.5">
        <div className="flex items-baseline justify-between gap-3">
          {rank !== undefined && rank !== null ? (
            <div>
              <div className="text-[10px] font-black text-slate-600 uppercase">Global Rank</div>
              <div className="text-2xl font-black text-slate-950 flex items-baseline gap-0.5">
                <span className="text-sky-700 text-xl font-black">#</span>
                <span>{rank}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[10px] font-black text-slate-600 uppercase">Global Index</div>
              <div className="text-xl font-black text-slate-950">—</div>
            </div>
          )}

          {value !== undefined && value !== null && (
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-600 uppercase">Value</div>
              <div className="text-lg font-black text-slate-950 font-mono">
                {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs font-sans text-slate-800">{unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Benchmark Percentile Bar */}
        {rank !== undefined && rank !== null && (
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-900">
              <span>Relative Position</span>
              <span className="text-sky-800">Top {100 - rankPercentile}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-sky-600 to-emerald-600 transition-all duration-500"
                style={{ width: `${rankPercentile}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Source Attribution */}
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
