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
  ShieldCheck,
  Compass,
  Layers
} from 'lucide-react';

export const Sidebar = () => {
  const sections = [
    {
      title: 'Main Dashboard',
      items: [
        { to: '/', label: 'Home Dashboard', icon: LayoutDashboard, count: '84 Ind' },
        { to: '/map', label: 'Interactive World Map', icon: MapPin, count: 'Live' },
      ],
    },
    {
      title: 'Comparative Analytics',
      items: [
        { to: '/compare', label: 'Country Comparison', icon: ArrowRightLeft },
        { to: '/trends', label: 'Historical Trends', icon: LineChart, count: '2020-25' },
      ],
    },
    {
      title: 'Domains & Discovery',
      items: [
        { to: '/categories', label: 'Category Explorer', icon: Grid, count: '10 Cat' },
        { to: '/search', label: 'Search & Filter', icon: Search },
      ],
    },
    {
      title: 'AI Intelligence Engine',
      items: [
        { to: '/ai-insights', label: 'AI Executive Summaries', icon: Sparkles, badge: 'Llama 3.1' },
      ],
    },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-200 hidden lg:flex flex-col min-h-[calc(100vh-85px)] p-4 bg-white/90">
      <div className="space-y-6 flex-1">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 flex items-center justify-between">
              <span>{sec.title}</span>
            </div>

            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200/80 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </div>

                    {item.count && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        {item.count}
                      </span>
                    )}

                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* UX4G Accreditation Footer Card */}
      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-100 text-xs text-slate-600 space-y-1.5 shadow-2xs">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>UX4G Design System</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
          Official Digital Governance Framework with 20+ verified international datasets.
        </p>
      </div>
    </aside>
  );
};
