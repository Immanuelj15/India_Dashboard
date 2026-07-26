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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="dash-card dash-card-hover p-5 flex flex-col justify-between group bg-white"
    >
      <div>
        {/* Category & Flag Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-blue-200">
            {category}
          </span>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
            <span>{flagEmoji}</span>
            <span>{countryName}</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>
        )}
      </div>

      {/* Main Metric & Rank Section */}
      <div className="my-4 pt-3 border-t border-[#E2E8F0] space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          {rank !== undefined && rank !== null ? (
            <div>
              <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">Global Rank</div>
              <div className="text-2xl font-extrabold text-[#0F172A] flex items-baseline gap-1 tracking-tight mt-0.5">
                <span className="text-[#2563EB] text-lg font-bold">#</span>
                <span>{rank}</span>
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-[#10B981] ml-1 self-center" />
                ) : trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 text-[#EF4444] ml-1 self-center" />
                ) : (
                  <Minus className="w-4 h-4 text-[#64748B] ml-1 self-center" />
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">Global Index</div>
              <div className="text-xl font-bold text-[#0F172A] mt-0.5">—</div>
            </div>
          )}

          {value !== undefined && value !== null && (
            <div className="text-right">
              <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">Metric Value</div>
              <div className="text-base font-bold text-[#0F172A] font-mono mt-0.5">
                {typeof value === 'number' ? value.toLocaleString() : value} <span className="text-xs font-sans text-[#64748B] font-normal">{unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Visual Percentile Progress Bar */}
        {rank !== undefined && rank !== null && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B]">
              <span>Relative Position</span>
              <span className="text-[#2563EB] font-semibold">Top {100 - rankPercentile}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#2563EB] transition-all duration-300"
                style={{ width: `${rankPercentile}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Source Link Footer */}
      <div className="pt-2 border-t border-[#E2E8F0]">
        <SourceBadge
          sourceName={sourceName}
          sourceUrl={sourceUrl}
          lastUpdated={lastUpdated}
        />
      </div>
    </motion.div>
  );
};
