import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchRankings } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import {
  Grid,
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
  Search,
  ArrowUpDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const categoryIconMap = {
  economy: Landmark,
  society: Users,
  governance: Scale,
  'technology-innovation': Cpu,
  education: GraduationCap,
  healthcare: HeartPulse,
  environment: Leaf,
  safety: ShieldCheck,
  equality: Handshake,
  'digital-government': Globe,
};

export const CategoryExplorer = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('economy');
  const [rankings, setRankings] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [sortBy, setSortBy] = useState('rank-asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const loadCategoryRankings = async (slug) => {
    setLoading(true);
    try {
      const res = await fetchRankings('India', slug, undefined, 2024);
      setRankings(res);
    } catch (err) {
      console.error('Error loading category rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      loadCategoryRankings(activeCategory);
    }
  }, [activeCategory]);

  const currentCatObj = categories.find((c) => c.slug === activeCategory);
  const CurrentIcon = categoryIconMap[activeCategory] || Landmark;

  let filteredRankings = rankings.filter((r) =>
    r.indicator.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
    (r.indicator.description && r.indicator.description.toLowerCase().includes(filterSearch.toLowerCase()))
  );

  if (sortBy === 'rank-asc') {
    filteredRankings.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  } else if (sortBy === 'alphabetical') {
    filteredRankings.sort((a, b) => a.indicator.name.localeCompare(b.indicator.name));
  }

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="dash-card p-6 bg-white border border-[#E2E8F0]"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] mb-2">
          <Grid className="w-4 h-4" /> Category Explorer
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Domain Category Explorer</h1>
        <p className="text-xs text-[#64748B] mt-1">
          Explore India's global standings across 10 strategic dimensions of national progress.
        </p>
      </motion.div>

      {/* 10 Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.slug === activeCategory;
          const Icon = categoryIconMap[cat.slug] || Grid;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] border border-[#E2E8F0]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Large Category Header Banner */}
      {currentCatObj && (
        <div className="dash-card p-6 border-l-4 border-l-[#2563EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200 flex-shrink-0">
              <CurrentIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">
                {currentCatObj.name} Dimension
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">{currentCatObj.description}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-blue-200 self-start sm:self-auto">
            {rankings.length} Indicators Listed
          </span>
        </div>
      )}

      {/* Search, Filter & Sort Controls */}
      <div className="dash-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Filter indicators in this category..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] rounded-lg pl-9 pr-3 py-2 font-medium focus:outline-none focus:border-[#2563EB]"
          />
          <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="text-[#64748B]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[#0F172A] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="rank-asc">Top Ranks (#1 →)</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Indicator Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-48 bg-[#F8FAFC] rounded-xl animate-pulse border border-[#E2E8F0]"></div>
          ))}
        </div>
      ) : filteredRankings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRankings.map((r) => (
            <StatCard
              key={r.id}
              title={r.indicator.name}
              category={currentCatObj?.name || 'Category'}
              rank={r.rank}
              value={r.value}
              unit={r.unit}
              sourceName={r.source?.name}
              sourceUrl={r.source?.url}
              lastUpdated={r.last_updated}
              description={r.indicator.description}
              flagEmoji="🇮🇳"
              countryName="India"
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-[#64748B] dash-card">
          No indicators found matching "{filterSearch}".
        </div>
      )}
    </div>
  );
};
