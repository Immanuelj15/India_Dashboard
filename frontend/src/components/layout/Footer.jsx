import React from 'react';
import { ShieldCheck, ExternalLink, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-panel border-t-2 border-slate-300 mt-12 py-8 px-4 lg:px-8 text-xs text-slate-800 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-700" />
          <span className="font-extrabold text-slate-950">India in the World — National UX4G Digital Governance Platform</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-900 font-extrabold">
          <a
            href="https://data.worldbank.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 flex items-center gap-1 transition-colors underline"
          >
            World Bank <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://hdr.undp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 flex items-center gap-1 transition-colors underline"
          >
            UNDP <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.wipo.int/gii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 flex items-center gap-1 transition-colors underline"
          >
            WIPO <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.transparency.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 flex items-center gap-1 transition-colors underline"
          >
            Transparency Int. <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-[11px] text-slate-900 font-black">
          Official Global Data Aggregation Engine
        </p>
      </div>
    </footer>
  );
};
