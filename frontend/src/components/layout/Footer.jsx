import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-panel border-t border-slate-200 mt-12 py-8 px-4 lg:px-8 text-xs text-slate-500 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span className="font-semibold text-slate-800">India in the World — UX4G Digital Governance Platform</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-600">
          <a
            href="https://data.worldbank.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 flex items-center gap-1 transition-colors"
          >
            World Bank <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://hdr.undp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 flex items-center gap-1 transition-colors"
          >
            UNDP <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.wipo.int/gii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 flex items-center gap-1 transition-colors"
          >
            WIPO <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.transparency.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 flex items-center gap-1 transition-colors"
          >
            Transparency Int. <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          Official Global Data Aggregation Engine
        </p>
      </div>
    </footer>
  );
};
