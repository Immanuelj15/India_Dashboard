import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import {
  Search,
  Globe,
  Sparkles,
  TrendingUp,
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
    { to: '/search', label: 'Search', icon: Search },
    { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Indian National Tricolor Top Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-sky-600 to-emerald-600"></div>

      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-white text-[11px] py-1 px-4 lg:px-8 font-bold">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Government of India • Global Progress Dashboard</span>
          </div>
          <div className="text-amber-400 font-extrabold text-[10px] tracking-wide uppercase">
            Official Data Portal
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-sky-600 to-emerald-600 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Award className="w-5 h-5 text-sky-700" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl text-slate-950 group-hover:text-sky-700 transition-colors">
                India in the World
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 hidden sm:inline-block">
                🇮🇳 Global Progress
              </span>
            </div>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            placeholder="Search indicator, country, category (e.g. GDP, Innovation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-950 rounded-xl pl-9 pr-10 py-2 font-bold focus:outline-none focus:border-sky-700 focus:bg-white transition-all placeholder-slate-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </form>

        {/* Quick Nav Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/ai-insights"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Summaries</span>
          </Link>

          <Link
            to="/compare"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-950 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Compare</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-950 hover:bg-slate-200 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-950 rounded-xl pl-9 pr-3 py-2 font-bold"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
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
                    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black transition-all ${
                      isActive
                        ? 'bg-sky-100 text-sky-950 border border-sky-300'
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
