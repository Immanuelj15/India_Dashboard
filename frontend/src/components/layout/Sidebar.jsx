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
  ShieldCheck
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
    <aside className="w-64 glass-panel border-r border-slate-200 hidden lg:flex flex-col min-h-[calc(100vh-65px)] p-4 bg-white">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-3 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
        Navigation Menu
      </div>
      <nav className="space-y-1 flex-1">
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
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="w-4 h-4 text-sky-600" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Verified Data Tag Footer */}
      <div className="mt-auto p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
          UX4G Government Design
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Compliant with UX4G Digital Governance Standards & 20+ trusted global datasets.
        </p>
      </div>
    </aside>
  );
};
