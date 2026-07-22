import React from 'react';
import { ExternalLink, Calendar, Database } from 'lucide-react';

export const SourceBadge = ({
  sourceName = 'Official Source',
  sourceUrl = '#',
  lastUpdated = '2024',
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800 ${className}`}>
      <span className="flex items-center gap-1 bg-slate-200 px-2.5 py-1 rounded-md border border-slate-400 text-slate-950">
        <Database className="w-3.5 h-3.5 text-sky-700" />
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-700 underline flex items-center gap-0.5"
        >
          {sourceName}
          <ExternalLink className="w-3 h-3 ml-0.5 text-slate-700" />
        </a>
      </span>

      {lastUpdated && (
        <span className="flex items-center gap-1 text-slate-900 font-extrabold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
          <Calendar className="w-3 h-3 text-emerald-700" />
          Updated {lastUpdated}
        </span>
      )}
    </div>
  );
};
