import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, Sparkles, TrendingUp } from 'lucide-react';

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
    <header className="sticky top-0 z-50 glass-panel border-b border-surface-border px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-saffron via-white to-accent-green p-0.5 shadow-lg shadow-accent-saffron/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent-saffron group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-primary-500">
                India in the World
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-saffron/10 text-accent-saffron border border-accent-saffron/20 hidden sm:inline-block">
                🇮🇳 Global Progress
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">Consolidated Global Indices Dashboard</p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            placeholder="Search indicator, country, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-card border border-surface-border text-sm text-gray-100 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500 transition-colors placeholder-gray-400"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        </form>

        {/* Quick Nav Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/ai-insights"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-accent-violet to-primary-600 hover:from-accent-violet/90 hover:to-primary-600/90 text-white shadow-md shadow-accent-violet/20 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-card hover:bg-surface-border border border-surface-border text-gray-200 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-accent-cyan" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
