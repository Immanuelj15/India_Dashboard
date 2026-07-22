import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, Sparkles, TrendingUp, ShieldCheck, ChevronRight, Compass } from 'lucide-react';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top UX4G Official Utility Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200 font-semibold">Government of India • Global Development Data Initiative</span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-block text-slate-400">UX4G Compliant Design System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1 text-sky-400 font-semibold">
              <ShieldCheck className="w-3 h-3" /> 20+ Verified Global Datasets
            </span>
            <span className="text-slate-300 bg-slate-800 px-2 py-0.5 rounded font-mono text-[10px]">
              v2026.1
            </span>
          </div>
        </div>
      </div>

      {/* Main UX4G Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-700 via-sky-600 to-sky-400 p-0.5 shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Globe className="w-6 h-6 text-sky-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                India in the World
              </span>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 hidden sm:inline-flex items-center gap-1 shadow-2xs">
                🇮🇳 Global Progress
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-tight">Consolidated International Indices & Analytics Dashboard</p>
          </div>
        </Link>

        {/* Global Search Bar with UX4G Focus Ring */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block group">
          <input
            type="text"
            placeholder="Search indicators, countries, categories (e.g. GDP, Innovation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/80 border border-slate-200 text-sm text-slate-900 rounded-xl pl-10 pr-12 py-2.5 focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/15 transition-all placeholder-slate-400 font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 group-focus-within:text-sky-600 absolute left-3.5 top-3.5 transition-colors" />
          <kbd className="absolute right-3 top-3 text-[10px] font-semibold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            ⌘K
          </kbd>
        </form>

        {/* Quick Nav Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/ai-insights"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/25 hover:shadow-sky-600/35 transition-all transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all hover:border-slate-300"
          >
            <TrendingUp className="w-4 h-4 text-sky-600" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
