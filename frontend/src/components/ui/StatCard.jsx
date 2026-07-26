import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SourceBadge } from './SourceBadge';
import { motion } from 'framer-motion';

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
  trend = 'up',
}) => {
  const rankPercentile = rank ? Math.max(5, Math.min(100, Math.round(((190 - rank) / 190) * 100))) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="dash-card p-6 flex flex-col justify-between group bg-white/95 backdrop-blur-sm rounded-2xl border border-[#E2E8F0] hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
    >
      {/* Accent Hover Gradient Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        {/* Category & Flag Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-blue-200 shadow-2xs">
            {category}
          </span>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
            <span>{flagEmoji}</span>
            <span>{countryName}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>
        )}
      </div>

      {/* Main Metric & Rank Section */}
      <div className="my-5 pt-4 border-t border-[#E2E8F0] space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          {rank !== undefined && rank !== null ? (
            <div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Global Rank</div>
              <div className="text-3xl font-black text-[#0F172A] flex items-baseline gap-1 tracking-tight mt-1">
                <span className="text-[#2563EB] text-xl font-extrabold">#</span>
                <span className="group-hover:scale-105 transition-transform duration-200 inline-block">{rank}</span>
                {trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-[#10B981] ml-1 self-center animate-pulse" />
                ) : trend === 'down' ? (
                  <TrendingDown className="w-5 h-5 text-[#EF4444] ml-1 self-center" />
                ) : (
                  <Minus className="w-5 h-5 text-[#64748B] ml-1 self-center" />
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Global Index</div>
              <div className="text-2xl font-bold text-[#0F172A] mt-1">—</div>
            </div>
          )}

          {value !== undefined && value !== null && (
            <div className="text-right">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Metric Value</div>
              <div className="text-lg font-bold text-[#0F172A] font-mono mt-1">
                {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs font-sans text-[#64748B] font-normal">{unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Visual Percentile Progress Bar with Animated Fill */}
        {rank !== undefined && rank !== null && (
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs text-[#64748B] font-semibold">
              <span>Top {101 - rankPercentile}% Worldwide</span>
              <span>190 Countries</span>
            </div>
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden p-0.5 border border-[#E2E8F0]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rankPercentile}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full"
              ></motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Source Badge */}
      <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
        <SourceBadge name={sourceName} url={sourceUrl} lastUpdated={lastUpdated} />
      </div>
    </motion.div>
  );
};
