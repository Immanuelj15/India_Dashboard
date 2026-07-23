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
  const sections = [
    {
      title: 'Dashboard',
      items: [
        { to: '/', label: 'Home Dashboard', icon: LayoutDashboard },
        { to: '/map', label: 'World Map', icon: MapPin },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { to: '/compare', label: 'Country Comparison', icon: ArrowRightLeft },
        { to: '/trends', label: 'Historical Trends', icon: LineChart },
      ],
    },
    {
      title: 'Explorer',
      items: [
        { to: '/categories', label: 'Category Explorer', icon: Grid },
        { to: '/search', label: 'Search & Filter', icon: Search },
      ],
    },
    {
      title: 'AI Engine',
      items: [
        { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
      ],
    },
  ];

  return (
    <aside className="w-60 glass-panel border-r border-slate-200 hidden lg:flex flex-col min-h-[calc(100vh-85px)] p-3.5 bg-white/95">
      <div className="space-y-5 flex-1">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 pb-0.5 flex items-center justify-between">
              <span>{sec.title}</span>
            </div>

            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black transition-all group ${
                        isActive
                          ? 'bg-sky-100/80 text-sky-950 font-black border border-sky-300 shadow-2xs'
                          : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100/90'
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
        ))}
      </div>

      {/* Official UX4G Framework Card */}
      <div className="mt-auto p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-sky-50/80 border border-slate-200 text-xs space-y-1 shadow-2xs">
        <div className="font-black text-slate-950 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>UX4G Framework</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-700 font-bold">
          Official Digital Governance Standard & Verified International Analytics.
        </p>
      </div>
    </aside>
  );
};
