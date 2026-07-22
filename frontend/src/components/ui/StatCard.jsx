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
  trendText = '+2 ranks over last 3 years',
  sourceName,
  sourceUrl,
  lastUpdated,
  description,
  flagEmoji = '🇮🇳',
  countryName = 'India',
}) => {
  return (
    <div className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
            {category}
          </span>

          <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
            <span>{flagEmoji}</span>
            <span>{countryName}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-100 group-hover:text-primary-400 transition-colors line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Main Metric & Rank Section */}
      <div className="my-4 pt-3 border-t border-surface-border/50 flex items-baseline justify-between gap-4">
        {rank !== undefined && rank !== null ? (
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Global Rank</div>
            <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
              <span className="text-accent-saffron text-2xl">#</span>
              <span>{rank}</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Global Index</div>
            <div className="text-2xl font-bold text-white">—</div>
          </div>
        )}

        {value !== undefined && value !== null && (
          <div className="text-right">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Metric Value</div>
            <div className="text-xl font-bold text-gray-200">
              {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs text-gray-400 font-normal">{unit}</span>
            </div>
          </div>
        )}
      </div>

      {/* Trend & Source Attribution Footer */}
      <div className="space-y-2 pt-2 border-t border-surface-border/40">
        <div className="flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-1.5 text-emerald-400">
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
            {trend === 'stable' && <Minus className="w-3.5 h-3.5 text-gray-400" />}
            <span className={trend === 'down' ? 'text-rose-400' : 'text-emerald-400'}>
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
