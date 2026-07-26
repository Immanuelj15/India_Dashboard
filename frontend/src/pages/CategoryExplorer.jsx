import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCategories, fetchCountryRankings } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import {
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
  ArrowUpDown,
  Clock,
  Layers,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';

const categoryIcons = {
  'economy': Landmark,
  'society': Users,
  'governance': Scale,
  'technology-innovation': Cpu,
  'education': GraduationCap,
  'healthcare': HeartPulse,
  'environment': Leaf,
  'safety': ShieldCheck,
  'equality': Handshake,
  'digital-government': Globe,
};

export const CategoryExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'economy';

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState('');
  const [sortBy, setSortBy] = useState('rank-asc');

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const loadCategoryRankings = async (slug) => {
    setLoading(true);
    try {
      const res = await fetchCountryRankings('India', 2024, slug);
      setRankings(res);
    } catch (err) {
      console.error('Error fetching category rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      loadCategoryRankings(activeCategory);
    }
  }, [activeCategory]);

  const handleTabChange = (slug) => {
    setActiveCategory(slug);
    setSearchParams({ cat: slug });
  };

  const currentCatObj = categories.find((c) => c.slug === activeCategory);
  const Icon = categoryIcons[activeCategory] || Landmark;

  let filteredRankings = rankings.filter((r) =>
    r.indicator.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
    r.indicator.description?.toLowerCase().includes(filterSearch.toLowerCase())
  );

  if (sortBy === 'rank-asc') {
    filteredRankings.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  } else if (sortBy === 'alphabetical') {
    filteredRankings.sort((a, b) => a.indicator.name.localeCompare(b.indicator.name));
  }

  return (
    <div className="space-y-10 w-full">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="dash-card p-8 sm:p-10 bg-white border border-[#E2E8F0] rounded-3xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200 shadow-xs">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
                  {currentCatObj?.name || 'Category Explorer'}
                </h1>
                <span className="text-sm font-extrabold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] border border-blue-200">
                  {rankings.length} Indicators
                </span>
              </div>
              <p className="text-base text-[#64748B] font-medium mt-1">
                {currentCatObj?.description || 'Explore official indicators across global categories.'}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-base font-bold text-[#64748B] bg-[#F8FAFC] px-4 py-2 rounded-xl border border-[#E2E8F0]">
            <Clock className="w-4.5 h-4.5 text-[#2563EB]" /> Verified 2024 Records
          </div>
        </div>

        {/* 10 Category Tabs Grid */}
        <div className="pt-2 flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => {
            const CatIcon = categoryIcons[cat.slug] || Layers;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleTabChange(cat.slug)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-base font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A] border border-[#E2E8F0]'
                }`}
              >
                <CatIcon className="w-4.5 h-4.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Filter and Sort Toolbar */}
      <div className="dash-card p-5 bg-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Filter indicators in this category..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-base text-[#0F172A] rounded-xl pl-11 pr-4 py-3 font-medium focus:outline-none focus:border-[#2563EB]"
          />
          <Search className="w-5 h-5 text-[#64748B] absolute left-4 top-3.5" />
        </div>

        <div className="flex items-center gap-2 bg-[#F8FAFC] px-4 py-2 rounded-xl border border-[#E2E8F0] text-base font-medium">
          <ArrowUpDown className="w-4.5 h-4.5 text-[#64748B]" />
          <span className="text-[#64748B] font-bold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[#0F172A] font-extrabold focus:outline-none cursor-pointer"
          >
            <option value="rank-asc">Top Ranks (#1 →)</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Indicator Cards Grid - Spacious 3 Column Layout */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 bg-[#F8FAFC] rounded-2xl animate-pulse border border-[#E2E8F0]"></div>
          ))}
        </div>
      ) : filteredRankings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
        <div className="dash-card p-12 text-center bg-white rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] text-[#64748B] flex items-center justify-center mx-auto border border-[#E2E8F0]">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A]">No Indicators Found</h3>
          <p className="text-base text-[#64748B]">No indicators match your filter query in this category.</p>
        </div>
      )}
    </div>
  );
};
