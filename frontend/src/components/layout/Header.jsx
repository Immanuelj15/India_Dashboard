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
  Globe,
  SlidersHorizontal
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
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/map', label: 'World Map', icon: Map },
    { to: '/compare', label: 'Comparison', icon: GitCompare },
    { to: '/trends', label: 'Trends', icon: LineChart },
    { to: '/categories', label: 'Categories', icon: Grid, hasDropdown: true },
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
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-md">
      {/* Top National Tricolor Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-[#FFFFFF]"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo & State Emblem of India */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 border border-slate-300 shadow-xs">
            <img src="/india-emblem.png" alt="State Emblem of India" className="w-full h-full object-contain" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-white group-hover:text-blue-400 transition-colors tracking-tight flex items-center gap-2">
              India in the World
              <img src="/india-flag.png" alt="India Flag" className="w-5 h-3.5 rounded-xs object-cover border border-slate-700 shadow-xs" />
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/80 hidden xl:inline-flex">
              National Analytics Portal
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            if (item.hasDropdown) {
              return (
                <div key={item.to} className="relative">
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-extrabold transition-all ${
                          isActive || location.pathname === '/categories'
                            ? 'bg-[#2563EB] text-white shadow-xs'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>

                    <button
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      onBlur={() => setTimeout(() => setCategoriesOpen(false), 200)}
                      className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-0.5"
                      title="Quick Category Menu"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {categoriesOpen && (
                    <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span>10 Strategic Categories</span>
                        <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">2024</span>
                      </div>
                      <div className="grid grid-cols-1 gap-0.5 pt-1 max-h-80 overflow-y-auto">
                        {quickDomains.map((domain) => {
                          const DomainIcon = domain.icon;
                          const isSelected = location.pathname === '/categories' && (currentCatParam === domain.slug || (!currentCatParam && domain.slug === 'economy'));

                          return (
                            <Link
                              key={domain.slug}
                              to={`/categories?cat=${domain.slug}`}
                              onClick={() => setCategoriesOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                                isSelected
                                  ? 'bg-[#2563EB] text-white font-bold'
                                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <DomainIcon className={`w-4 h-4 ${domain.color}`} />
                              <span>{domain.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-extrabold transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Search Input & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          {/* Global Compact Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-72">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search index or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl pl-9 pr-12 py-2 font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all placeholder-slate-400"
              />
              <kbd className="absolute right-2.5 text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                ⌘K
              </kbd>
            </div>
          </form>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
              className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded-xl pl-10 pr-3 py-2 font-medium"
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
                    `flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
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
