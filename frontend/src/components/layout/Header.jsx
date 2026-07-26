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
  Bell,
  UserCircle,
  Moon,
  Settings
} from 'lucide-react';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
        {/* Brand Logo & State Emblem of India */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-white p-0.5 flex items-center justify-center flex-shrink-0 border border-slate-300 shadow-xs">
            <img src="/india-emblem.png" alt="State Emblem of India" className="w-full h-full object-contain" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors tracking-tight flex items-center gap-2">
                India in the World
                <img src="/india-flag.png" alt="India Flag" className="w-5 h-3.5 rounded-xs object-cover border border-slate-700 shadow-xs" />
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

        {/* Quick Actions, Theme, Notifications & Profile */}
        <div className="flex items-center gap-2">
          {/* AI Summaries Shortcut */}
          <Link
            to="/ai-insights"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">AI Summaries</span>
          </Link>

          {/* Theme Switch Toggle Icon */}
          <button
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            <Moon className="w-4 h-4" />
          </button>

          {/* Notifications Bell Icon */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2563EB]"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl p-3 z-50 text-xs space-y-2">
                <div className="font-bold text-white border-b border-slate-800 pb-1.5 flex items-center justify-between">
                  <span>System Notifications</span>
                  <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800">Live</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
                  <div className="font-semibold text-white">2024 Dataset Updated</div>
                  <div className="text-[11px] text-slate-400">World Bank GDP & Innovation records updated successfully.</div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Icon */}
          <button
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="User Profile"
          >
            <UserCircle className="w-5 h-5 text-slate-300" />
          </button>

          {/* Mobile Menu Toggle */}
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
