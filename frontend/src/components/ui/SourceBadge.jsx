import React from 'react';
import { ExternalLink, Calendar, Database } from 'lucide-react';

export const SourceBadge = ({
  sourceName = 'Official Source',
  sourceUrl = '#',
  lastUpdated = '2024',
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-[11px] text-slate-500 ${className}`}>
      <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium">
        <Database className="w-3 h-3 text-sky-600" />
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-600 hover:underline flex items-center gap-0.5"
        >
          {sourceName}
          <ExternalLink className="w-2.5 h-2.5 ml-0.5 text-slate-400" />
        </a>
      </span>

      {lastUpdated && (
        <span className="flex items-center gap-1 text-slate-400 font-medium">
          <Calendar className="w-3 h-3" />
          Updated {lastUpdated}
        </span>
      )}
    </div>
  );
};
