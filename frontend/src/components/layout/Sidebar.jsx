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
    <aside className="w-64 flex-shrink-0 border-r border-[#E2E8F0] hidden lg:flex flex-col min-h-[calc(100vh-70px)] p-5 bg-white">
      <div className="space-y-6 flex-1">
        {/* Main Navigation Group */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] px-3 pb-2">
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
                    `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#2563EB]'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Quick Domain Categories Group */}
        <div className="space-y-1.5 pt-4 border-t border-[#E2E8F0]">
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] px-3 pb-2 flex items-center justify-between">
            <span>Categories</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-blue-200">10</span>
          </div>

          <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
            {quickDomains.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <Link
                  key={idx}
                  to="/categories"
                  className="flex items-center justify-between px-3.5 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${domain.color}`} />
                    <span className="text-sm font-semibold">{domain.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dataset Footprint Card */}
      <div className="mt-auto p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm space-y-1.5">
        <div className="font-bold text-[#0F172A] flex items-center gap-2">
          <Database className="w-4 h-4 text-[#2563EB]" />
          <span>Global Datasets</span>
        </div>
        <p className="text-xs text-[#64748B] leading-relaxed font-medium">
          84 Verified Indicators across 19 Public Sources
        </p>
      </div>
    </aside>
  );
};
