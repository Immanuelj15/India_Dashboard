import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import {
  Search,
  Sparkles,
  GitCompare,
  LayoutDashboard,
  LineChart,
  Map,
  Grid,
  Menu,
  X,
  Globe
} from 'lucide-react';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { to: '/', label: 'Home Dashboard', icon: LayoutDashboard },
    { to: '/map', label: 'World Map', icon: Map },
    { to: '/compare', label: 'Country Comparison', icon: GitCompare },
    { to: '/trends', label: 'Historical Trends', icon: LineChart },
    { to: '/categories', label: 'Category Explorer', icon: Grid },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-md">
      {/* Top National Tricolor Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-[#FFFFFF]"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & National Emblem */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Ashoka Lion Emblem */}
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 p-1 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500 transition-colors">
            <img src="/india-emblem.svg" alt="Emblem of India" className="w-full h-full object-contain filter invert brightness-200" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors tracking-tight flex items-center gap-2">
                India in the World
                {/* Indian Flag Badge */}
                <img src="/india-flag.svg" alt="India Flag" className="w-5 h-3.5 rounded-xs object-cover border border-slate-700 shadow-xs" />
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 hidden sm:inline-flex">
                Global Progress Dashboard
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Official National Analytics & Indicator Portal</p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block group">
          <input
            type="text"
            placeholder="Search indicator, country, or category (e.g., GDP, Innovation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg pl-9 pr-12 py-2 font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all placeholder-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 group-focus-within:text-blue-400 absolute left-3 top-2.5 transition-colors" />
          <kbd className="absolute right-3 top-2 text-[10px] font-semibold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </form>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/ai-insights"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition-colors"
          >
            <GitCompare className="w-4 h-4 text-blue-400" />
            <span>Compare</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0F172A] p-4 space-y-3 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg pl-9 pr-3 py-2 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <nav className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#2563EB] text-white'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
