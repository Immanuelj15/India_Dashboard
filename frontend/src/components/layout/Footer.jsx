import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-panel border-t border-surface-border mt-12 py-8 px-4 lg:px-8 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>India in the World — Lets Code Development Challenge 2026</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-gray-400">
          <a
            href="https://data.worldbank.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            World Bank <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://hdr.undp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            UNDP <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.wipo.int/gii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            WIPO <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.transparency.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            Transparency Int. <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-[11px] text-gray-500">
          Official Global Data Aggregation Engine
        </p>
      </div>
    </footer>
  );
};
