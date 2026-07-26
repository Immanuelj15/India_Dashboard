import React from 'react';
import { ExternalLink, Database, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-16 bg-[#0F172A] text-slate-300 border-t border-slate-800">
      {/* Top National Tricolor Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-[#FFFFFF]"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 p-0.5 flex items-center justify-center">
                <img src="/india-emblem.svg" alt="Emblem of India" className="w-full h-full object-contain filter invert brightness-200" />
              </div>
              <span className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                India in the World
                <img src="/india-flag.svg" alt="India Flag" className="w-4 h-3 rounded-xs object-cover border border-slate-700" />
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Consolidating India’s performance across global indices from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-medium text-[#10B981]">
              Official Public Datasets Only
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Dashboard</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">Interactive World Map</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">Country Comparison</Link>
              </li>
              <li>
                <Link to="/trends" className="hover:text-white transition-colors">Historical Trends</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">Category Explorer</Link>
              </li>
              <li>
                <Link to="/ai-insights" className="hover:text-white transition-colors">AI Summaries</Link>
              </li>
            </ul>
          </div>

          {/* Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#2563EB]" /> Public Sources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  World Bank Open Data <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://hdr.undp.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  UNDP Human Development <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.wipo.int/gii" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  WIPO Innovation Index <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.imf.org/en/Data" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  IMF World Economic Outlook <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.transparency.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Transparency International <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* AI Tech Card */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> AI Synthesis
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="font-semibold text-white">LangChain + Ollama RAG</div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                Local LLM synthesis pipeline grounded on verified database records.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Rights Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div>© 2026 India in the World — Global Progress Dashboard</div>
          <div className="flex items-center gap-2">
            <span>सत्यमेव जयते</span>
            <span>•</span>
            <span>Truth Alone Triumphs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
