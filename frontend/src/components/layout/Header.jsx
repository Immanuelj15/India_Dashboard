import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import {
  Search,
  Sparkles,
  TrendingUp,
  Award,
  Menu,
  X,
  LayoutDashboard,
  ArrowRightLeft,
  LineChart,
  MapPin,
  Grid,
  ShieldCheck
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
    { to: '/map', label: 'World Map', icon: MapPin },
    { to: '/compare', label: 'Country Comparison', icon: ArrowRightLeft },
    { to: '/trends', label: 'Historical Trends', icon: LineChart },
    { to: '/categories', label: 'Category Explorer', icon: Grid },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-premium transition-all">
      {/* Indian National Tricolor Glowing Top Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500 shadow-xs"></div>

      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-200 text-[11px] py-1.5 px-4 lg:px-8 font-extrabold tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs"></span>
            <span className="text-white font-extrabold">Government of India • Global Progress Dashboard</span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-block text-sky-400 font-bold">UX4G Standard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 20+ Global Datasets
            </span>
            <span className="text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-0.5 rounded-full font-black text-[10px] shadow-2xs">
              OFFICIAL DATA PORTAL
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-600 to-emerald-500 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Award className="w-6 h-6 text-sky-700 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-slate-950 group-hover:text-sky-700 transition-colors tracking-tight">
                India in the World
              </span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-50 to-sky-50 text-slate-900 border border-sky-200 hidden sm:inline-flex items-center gap-1 shadow-2xs">
                🇮🇳 National Progress
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-bold tracking-tight hidden sm:block">Consolidated International Indices & High-Contrast Analytics</p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block group">
          <input
            type="text"
            placeholder="Search indicator, country, category (e.g. GDP, Innovation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/90 border border-slate-300 text-xs text-slate-950 rounded-xl pl-9 pr-12 py-2.5 font-bold focus:outline-none focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/15 transition-all placeholder-slate-500 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-500 group-focus-within:text-sky-700 absolute left-3 top-3 transition-colors" />
          <kbd className="absolute right-3 top-2.5 text-[10px] font-black text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-300 shadow-2xs">
            ⌘K
          </kbd>
        </form>

        {/* Quick Nav Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/ai-insights"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white shadow-md shadow-sky-700/25 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-950 transition-all hover:border-slate-400"
          >
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Compare</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-950 hover:bg-slate-200 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-950 rounded-xl pl-9 pr-3 py-2.5 font-bold"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
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
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all ${
                      isActive
                        ? 'bg-sky-100 text-sky-950 border border-sky-300 shadow-2xs'
                        : 'text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-sky-700" />
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
