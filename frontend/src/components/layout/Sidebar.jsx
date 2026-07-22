import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRightLeft,
  LineChart,
  MapPin,
  Grid,
  Search,
  Sparkles,
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { to: '/', label: 'Home Dashboard', icon: LayoutDashboard },
    { to: '/compare', label: 'Country Comparison', icon: ArrowRightLeft },
    { to: '/trends', label: 'Historical Trends', icon: LineChart },
    { to: '/map', label: 'World Map', icon: MapPin },
    { to: '/categories', label: 'Category Explorer', icon: Grid },
    { to: '/search', label: 'Search & Filter', icon: Search },
    { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-surface-border hidden lg:flex flex-col min-h-[calc(100vh-65px)] p-4">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3 mb-3">
        Navigation Menu
      </div>
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30 shadow-sm'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-surface-card'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Verified Data Tag Footer */}
      <div className="mt-auto p-3.5 rounded-xl bg-surface-card border border-surface-border text-xs text-gray-400 space-y-1">
        <div className="font-semibold text-gray-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          20+ Trusted Sources
        </div>
        <p className="text-[11px] leading-relaxed text-gray-400">
          World Bank, UN, IMF, WEF, WHO, WIPO, Transparency Int. & OECD.
        </p>
      </div>
    </aside>
  );
};
