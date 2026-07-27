import React, { useState, useEffect, useRef } from 'react';
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
  Bell,
  CircleUser,
  Github
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll height shrink detection (72px -> 64px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener (Ctrl+K / ⌘K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/categories', label: 'Categories', icon: Grid, hasDropdown: true },
    { to: '/compare', label: 'Compare', icon: GitCompare },
    { to: '/map', label: 'World Map', icon: Map },
    { to: '/trends', label: 'Historical Trends', icon: LineChart },
    { to: '/ai-insights', label: 'AI Insights', icon: Sparkles },
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
    <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-xl border-b border-slate-800 shadow-md transition-all duration-300">
      {/* Top National Tricolor Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-[#FFFFFF]"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* UX4G 1440px Centered Desktop Navigation Bar (72px default -> 64px on scroll) */}
      <div
        className={`w-full max-w-[1440px] mx-auto px-4 lg:px-6 flex items-center justify-between gap-4 transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-[72px]'
        }`}
      >
        {/* Brand Logo & State Emblem of India */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 border border-slate-300 shadow-xs"
          >
            <img src="/india-emblem.png" alt="State Emblem of India" className="w-full h-full object-contain" />
          </motion.div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-white group-hover:text-blue-400 transition-colors tracking-tight flex items-center gap-2">
              India in the World
              <img src="/india-flag.png" alt="India Flag" className="w-4.5 h-3 rounded-xs object-cover border border-slate-700 shadow-xs" />
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/80 hidden xl:inline-flex">
              Global Progress Dashboard
            </span>
          </div>
        </Link>

        {/* Center Navigation Links with Animated Active Underline */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.hasDropdown && location.pathname === '/categories');

            if (item.hasDropdown) {
              return (
                <div key={item.to} className="relative">
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      className={({ isActive: linkActive }) =>
                        `relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          linkActive || location.pathname === '/categories'
                            ? 'text-white font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavUnderline"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2563EB] rounded-full"
                        />
                      )}
                    </NavLink>

                    <button
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      onBlur={() => setTimeout(() => setCategoriesOpen(false), 200)}
                      className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors ml-0.5"
                      title="Quick Category Menu"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {categoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span>10 Strategic Categories</span>
                        <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">Latest</span>
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
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isSelected
                                  ? 'bg-[#2563EB] text-white font-semibold'
                                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                              }`}
                            >
                              <DomainIcon className={`w-4 h-4 ${domain.color}`} />
                              <span>{domain.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive: linkActive }) =>
                  `relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    linkActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2563EB] rounded-full"
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions: Search, Notifications, GitHub, Profile */}
        <div className="flex items-center gap-2">
          {/* Global Search Input with CTRL+K Hint */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-56 lg:w-64">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search country, ranking, indicator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg pl-8 pr-12 py-1.5 font-normal focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all placeholder-slate-400"
              />
              <kbd className="absolute right-2 text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                ⌘K
              </kbd>
            </div>
          </form>

          {/* GitHub Repo Button */}
          <a
            href="https://github.com/Immanuelj15/India_Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Notifications Button with Pulse */}
          <button className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block relative" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
          </button>

          {/* User Profile Button */}
          <button className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-1 text-xs font-medium" title="Profile Menu">
            <CircleUser className="w-5 h-5 text-blue-400" />
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-slate-800 bg-[#0F172A] p-4 space-y-4 shadow-xl overflow-hidden"
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded-lg pl-10 pr-3 py-2 font-normal"
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
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
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
        </motion.div>
      )}
    </header>
  );
};
