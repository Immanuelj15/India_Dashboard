import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  GitCompare,
  TrendingUp,
  Map,
  Grid,
  Search,
  Sparkles,
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
  Database
} from 'lucide-react';

export const Sidebar = () => {
  const mainNav = [
    { to: '/', label: 'Home Dashboard', icon: LayoutDashboard },
    { to: '/map', label: 'World Map', icon: Map },
    { to: '/compare', label: 'Country Comparison', icon: GitCompare },
    { to: '/trends', label: 'Historical Trends', icon: TrendingUp },
    { to: '/categories', label: 'Category Explorer', icon: Grid },
    { to: '/search', label: 'Search & Filter', icon: Search },
    { to: '/ai-insights', label: 'AI Summaries', icon: Sparkles },
  ];

  const quickDomains = [
    { label: 'Economy', icon: Landmark, color: 'text-blue-600' },
    { label: 'Society', icon: Users, color: 'text-indigo-600' },
    { label: 'Governance', icon: Scale, color: 'text-purple-600' },
    { label: 'Technology', icon: Cpu, color: 'text-[#2563EB]' },
    { label: 'Education', icon: GraduationCap, color: 'text-sky-600' },
    { label: 'Healthcare', icon: HeartPulse, color: 'text-rose-600' },
    { label: 'Environment', icon: Leaf, color: 'text-[#10B981]' },
    { label: 'Safety', icon: ShieldCheck, color: 'text-amber-600' },
    { label: 'Equality', icon: Handshake, color: 'text-teal-600' },
    { label: 'Digital Govt', icon: Globe, color: 'text-cyan-600' },
  ];

  return (
    <aside className="w-60 flex-shrink-0 border-r border-[#E2E8F0] hidden lg:flex flex-col min-h-[calc(100vh-65px)] p-4 bg-white">
      <div className="space-y-6 flex-1">
        {/* Main Navigation Group */}
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] px-3 pb-1.5">
            Overview
          </div>

          <nav className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#2563EB]'
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

        {/* Quick Domain Categories Group */}
        <div className="space-y-1 pt-3 border-t border-[#E2E8F0]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] px-3 pb-1.5 flex items-center justify-between">
            <span>Categories</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB]">10</span>
          </div>

          <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1">
            {quickDomains.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <Link
                  key={idx}
                  to="/categories"
                  className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 ${domain.color}`} />
                    <span className="text-xs font-medium">{domain.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dataset Footprint Card */}
      <div className="mt-auto p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
        <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Global Datasets</span>
        </div>
        <p className="text-[11px] text-[#64748B] leading-tight font-normal">
          84 Verified Indicators across 19 Public Sources
        </p>
      </div>
    </aside>
  );
};
