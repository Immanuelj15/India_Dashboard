import React from 'react';
import { Link as LinkIcon, Calendar } from 'lucide-react';

export const SourceBadge = ({
  sourceName = 'Official Source',
  sourceUrl = '#',
  lastUpdated = 'Latest',
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] ${className}`}>
      <span className="inline-flex items-center gap-1.5 font-medium">
        <LinkIcon className="w-3.5 h-3.5 text-[#2563EB]" />
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#2563EB] transition-colors inline-flex items-center gap-1 font-semibold text-[#0F172A]"
        >
          {sourceName}
        </a>
      </span>

      {lastUpdated && (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
          <Calendar className="w-3 h-3 text-[#64748B]" />
          {lastUpdated}
        </span>
      )}
    </div>
  );
};
