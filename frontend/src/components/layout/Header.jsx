import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, Sparkles, TrendingUp, ShieldCheck, Award } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-200 shadow-sm transition-all">
      {/* Indian National Tricolor Top Stripe (Saffron - White - Green) */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-sky-600 to-emerald-600"></div>

      {/* Top Utility Strip */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 lg:px-8 font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-bold tracking-wide">Government of India • Global Development Progress Dashboard</span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-block text-amber-400 font-bold">UX4G Compliant Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-sky-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> 20+ Verified Global Datasets
            </span>
            <span className="text-slate-900 bg-amber-400 px-2 py-0.5 rounded font-black text-[10px]">
              OFFICIAL PORTAL
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo with Indian Emblem / Flag Aesthetics */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-600 to-emerald-600 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Award className="w-6 h-6 text-sky-700 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-950 group-hover:text-sky-700 transition-colors">
                India in the World
              </span>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 hidden sm:inline-flex items-center gap-1 shadow-2xs">
                🇮🇳 National Progress
              </span>
            </div>
            <p className="text-xs text-slate-800 font-extrabold tracking-tight">Consolidated International Indices & High-Contrast Analytics</p>
          </div>
        </Link>

        {/* Global Search Bar with High Contrast Contrast */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block group">
          <input
            type="text"
            placeholder="Search indicator, country, category (e.g. GDP, Innovation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-2 border-slate-300 text-sm text-slate-950 rounded-xl pl-10 pr-12 py-2.5 focus:outline-none focus:border-sky-700 focus:bg-white font-bold transition-all placeholder-slate-600 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-700 group-focus-within:text-sky-700 absolute left-3.5 top-3.5 transition-colors" />
          <kbd className="absolute right-3 top-3 text-[10px] font-black text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded border border-slate-400">
            ⌘K
          </kbd>
        </form>

        {/* Quick Nav Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/ai-insights"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-sky-700 hover:bg-sky-800 text-white shadow-md shadow-sky-700/30 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-900 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
