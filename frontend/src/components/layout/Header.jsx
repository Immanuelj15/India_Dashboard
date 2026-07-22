import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200 px-4 lg:px-8 py-3 bg-white/95">
      {/* Top UX4G India Government Banner Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-sky-600 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                India in the World
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200 hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-sky-600" /> UX4G Governance Dashboard
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Consolidated Global Indices Engine • 🇮🇳 India Progress</p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            placeholder="Search indicator, country, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-sky-500 focus:bg-white transition-all placeholder-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </form>

        {/* Quick Nav Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/ai-insights"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-sky-600" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
