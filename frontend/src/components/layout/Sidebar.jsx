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
  Award
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
    <aside className="w-64 glass-panel border-r-2 border-slate-200 hidden lg:flex flex-col min-h-[calc(100vh-85px)] p-4 bg-white">
      <div className="space-y-6 flex-1">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-800 px-3 flex items-center justify-between border-b border-slate-100 pb-1">
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
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                        isActive
                          ? 'bg-sky-100 text-sky-950 font-black border-2 border-sky-400 shadow-sm'
                          : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-sky-700 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </div>

                    {item.count && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-200 text-slate-900 border border-slate-300">
                        {item.count}
                      </span>
                    )}

                    {item.badge && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
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

      {/* UX4G Accreditation Footer Card with Tiranga Accent */}
      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-emerald-50 border-2 border-slate-200 text-xs space-y-1.5 shadow-2xs">
        <div className="font-black text-slate-950 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-600" />
          <span>National UX4G Framework</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-900 font-extrabold">
          Compliant with UX4G Digital Governance Standards & 20+ verified international datasets.
        </p>
      </div>
    </aside>
  );
};
