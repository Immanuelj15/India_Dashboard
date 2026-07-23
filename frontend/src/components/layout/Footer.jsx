import React from 'react';
import { ExternalLink, Award, ShieldCheck, Heart, Globe, Database, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300 border-t-4 border-t-sky-600 shadow-2xl relative overflow-hidden">
      {/* Indian National Tricolor Top Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-500"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-sky-500 to-emerald-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Award className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight block">India in the World</span>
                <span className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase">Global Progress Dashboard</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-bold">
              Consolidating India’s performance across 70+ trusted international indices from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International under UX4G Digital Governance Standards.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-extrabold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> UX4G Compliant Framework
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-sky-400" /> Navigation
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  • Home Dashboard
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  • Interactive World Map
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  • Country Comparison
                </Link>
              </li>
              <li>
                <Link to="/trends" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  • Historical Trends
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  • Category Explorer
                </Link>
              </li>
              <li>
                <Link to="/ai-insights" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  • AI Summaries
                </Link>
              </li>
            </ul>
          </div>

          {/* Trusted Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-amber-400" /> Data Sources
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  World Bank Open Data <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://hdr.undp.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  UNDP Human Development <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.wipo.int/gii" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  WIPO Innovation Index <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.imf.org/en/Data" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  IMF World Economic Outlook <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.transparency.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Transparency International <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* AI Synthesis & Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI Technology
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="font-black text-white flex items-center gap-1">
                <span>LangChain + Ollama RAG</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
                Local LLM synthesis pipeline (Mistral / Phi-3 / Llama 3.1) with 100% factual database grounding.
              </p>
              <div className="text-[10px] text-sky-400 font-extrabold pt-1">
                Zero-Hallucination Verified
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Attribution Strip */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Government of India Global Progress Dashboard</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <span>Built with UX4G Digital Governance Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
