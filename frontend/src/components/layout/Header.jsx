import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import {
  Search,
  Globe,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award,
  Menu,
  X,
  LayoutDashboard,
  ArrowRightLeft,
  LineChart,
  MapPin,
  Grid
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
    { to: '/search', label: 'Search & Filter', icon: Search },
    { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-300 shadow-sm transition-all">
      {/* Indian National Tricolor Top Stripe (Saffron - White - Green) */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-sky-600 to-emerald-600"></div>

      {/* Top Utility Strip */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 lg:px-8 font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-bold tracking-wide">Government of India • Global Progress Dashboard</span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-block text-amber-400 font-bold">UX4G Framework</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-sky-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> 20+ Verified Global Datasets
            </span>
            <span className="text-slate-950 bg-amber-400 px-2 py-0.5 rounded font-black text-[10px]">
              OFFICIAL PORTAL
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-600 to-emerald-600 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Award className="w-5 h-5 text-sky-700 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-950 group-hover:text-sky-700 transition-colors">
                India in the World
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 hidden sm:inline-flex items-center gap-1">
                🇮🇳 Global Progress
              </span>
            </div>
            <p className="text-[11px] text-slate-800 font-extrabold tracking-tight hidden sm:block">Consolidated International Indices & Analytics Dashboard</p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block group">
          <input
            type="text"
            placeholder="Search indicator, country, category (e.g. GDP, Innovation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-2 border-slate-300 text-sm text-slate-950 rounded-xl pl-10 pr-12 py-2 focus:outline-none focus:border-sky-700 focus:bg-white font-bold transition-all placeholder-slate-600 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-700 group-focus-within:text-sky-700 absolute left-3.5 top-3 transition-colors" />
          <kbd className="absolute right-3 top-2.5 text-[10px] font-black text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded border border-slate-400">
            ⌘K
          </kbd>
        </form>

        {/* Quick Nav Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/ai-insights"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-sky-700 hover:bg-sky-800 text-white shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-950 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Compare</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 border-2 border-slate-300 text-slate-950 hover:bg-slate-200 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-slate-300 bg-white p-4 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search indicators, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-2 border-slate-300 text-sm text-slate-950 rounded-xl pl-10 pr-4 py-2 font-bold"
            />
            <Search className="w-4 h-4 text-slate-700 absolute left-3.5 top-3" />
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
                        ? 'bg-sky-100 text-sky-950 border-2 border-sky-400'
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
