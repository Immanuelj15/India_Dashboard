import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRightLeft,
  LineChart,
  MapPin,
  Grid,
  Search,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Building2,
  GraduationCap,
  HeartPulse,
  Leaf,
  Compass
} from 'lucide-react';

export const Sidebar = () => {
  const mainNav = [
    { to: '/', label: 'Home Dashboard', icon: LayoutDashboard },
    { to: '/map', label: 'World Map', icon: MapPin },
    { to: '/compare', label: 'Country Comparison', icon: ArrowRightLeft },
    { to: '/trends', label: 'Historical Trends', icon: LineChart },
    { to: '/search', label: 'Search & Filter', icon: Search },
    { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
  ];

  const quickDomains = [
    { label: 'Economy', color: 'bg-emerald-500', icon: TrendingUp },
    { label: 'Technology', color: 'bg-sky-500', icon: Cpu },
    { label: 'Governance', color: 'bg-amber-500', icon: Building2 },
    { label: 'Education', color: 'bg-blue-500', icon: GraduationCap },
    { label: 'Healthcare', color: 'bg-rose-500', icon: HeartPulse },
    { label: 'Environment', color: 'bg-emerald-600', icon: Leaf },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-200 hidden lg:flex flex-col min-h-[calc(100vh-85px)] p-4 bg-white/95 shadow-sm">
      <div className="space-y-6 flex-1">
        {/* Main Navigation Group */}
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 pb-1 flex items-center justify-between">
            <span>Main Navigation</span>
            <Compass className="w-3 h-3 text-sky-600" />
          </div>

          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black transition-all group ${
                      isActive
                        ? 'bg-sky-700 text-white font-black shadow-md shadow-sky-700/20'
                        : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-sky-700 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Quick Domain Shortcuts Group */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 flex items-center justify-between">
            <span>Domain Explorer</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">10 Domains</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {quickDomains.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <Link
                  key={idx}
                  to="/categories"
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${domain.color}`}></span>
                    <span className="text-[11px] font-extrabold">{domain.label}</span>
                  </div>
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-700 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Official UX4G Framework Footer Badge */}
      <div className="mt-auto p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-1.5 shadow-md">
        <div className="font-black text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>UX4G Portal</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <p className="text-[10px] text-slate-300 font-bold leading-tight">
          84 Global Indicators • 19 Data Sources
        </p>
      </div>
    </aside>
  );
};
