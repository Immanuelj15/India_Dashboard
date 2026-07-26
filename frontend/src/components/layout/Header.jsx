import React, { useState } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
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
  ChevronDown,
  Landmark,
  Users,
  Scale,
  Cpu,
  GraduationCap,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Handshake,
  Globe
} from 'lucide-react';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const quickDomains = [
    { label: 'Economy', slug: 'economy', icon: Landmark, color: 'text-blue-400' },
    { label: 'Society', slug: 'society', icon: Users, color: 'text-indigo-400' },
    { label: 'Governance', slug: 'governance', icon: Scale, color: 'text-purple-400' },
    { label: 'Technology', slug: 'technology-innovation', icon: Cpu, color: 'text-blue-500' },
    { label: 'Education', slug: 'education', icon: GraduationCap, color: 'text-sky-400' },
    { label: 'Healthcare', slug: 'healthcare', icon: HeartPulse, color: 'text-rose-400' },
    { label: 'Environment', slug: 'environment', icon: Leaf, color: 'text-emerald-400' },
    { label: 'Safety', slug: 'safety', icon: ShieldCheck, color: 'text-amber-400' },
    { label: 'Equality', slug: 'equality', icon: Handshake, color: 'text-teal-400' },
    { label: 'Digital Govt', slug: 'digital-government', icon: Globe, color: 'text-cyan-400' },
  ];

  const currentCatParam = new URLSearchParams(location.search).get('cat');

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-lg">
      {/* Top National Tricolor Accent Strip */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-[#FFFFFF]"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* Primary Top Header Row */}
      <div className="w-full max-w-[1720px] mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-6 border-b border-slate-800/80">
        {/* Brand Logo & State Emblem of India */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 border border-slate-300 shadow-xs">
            <img src="/india-emblem.png" alt="State Emblem of India" className="w-full h-full object-contain" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-xl text-white group-hover:text-blue-400 transition-colors tracking-tight flex items-center gap-2">
                India in the World
                <img src="/india-flag.png" alt="India Flag" className="w-6 h-4 rounded-xs object-cover border border-slate-700 shadow-xs" />
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800 hidden sm:inline-flex">
                Global Progress Dashboard
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium hidden sm:block mt-0.5">Official National Analytics & Indicator Portal</p>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative hidden md:block group">
          <input
            type="text"
            placeholder="Search indicator, country, or category (e.g., GDP, Innovation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded-xl pl-10 pr-14 py-2.5 font-medium focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] transition-all placeholder-slate-400"
          />
          <Search className="w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-400 absolute left-3.5 top-3 transition-colors" />
          <kbd className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </form>

        {/* Quick Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* AI Summaries Shortcut Button */}
          <Link
            to="/ai-insights"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs transition-colors"
          >
            <Sparkles className="w-4.5 h-4.5 text-white" />
            <span className="hidden sm:inline">AI Summaries</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Secondary Navbar Navigation Row (Desktop Top Navigation Bar) */}
      <div className="hidden lg:block bg-slate-950/60 border-b border-slate-800/60">
        <div className="w-full max-w-[1720px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1.5 py-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-extrabold transition-all ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* 10 Categories Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              onBlur={() => setTimeout(() => setCategoriesOpen(false), 200)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-extrabold border border-slate-700 transition-colors"
            >
              <Grid className="w-4.5 h-4.5 text-blue-400" />
              <span>10 Strategic Categories</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoriesOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2 border-b border-slate-800">
                  Select Category
                </div>
                <div className="grid grid-cols-1 gap-1 pt-1 max-h-80 overflow-y-auto">
                  {quickDomains.map((domain) => {
                    const Icon = domain.icon;
                    const isSelected = location.pathname === '/categories' && (currentCatParam === domain.slug || (!currentCatParam && domain.slug === 'economy'));

                    return (
                      <Link
                        key={domain.slug}
                        to={`/categories?cat=${domain.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          isSelected
                            ? 'bg-[#2563EB] text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${domain.color}`} />
                        <span>{domain.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0F172A] p-4 space-y-4 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded-xl pl-10 pr-3 py-2.5 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <nav className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#2563EB] text-white'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
              10 Categories
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {quickDomains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <Link
                    key={domain.slug}
                    to={`/categories?cat=${domain.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-900 hover:text-white bg-slate-900/50 border border-slate-800"
                  >
                    <Icon className={`w-4 h-4 ${domain.color}`} />
                    <span>{domain.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
