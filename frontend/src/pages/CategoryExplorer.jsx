import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCategories, fetchCountryRankings } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { ChartCard } from '../components/ui/ChartCard';
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
  Database,
  BarChart3
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
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

  // Filter rankings strictly by active category and search filter
  const categoryRankings = rankings.filter((r) => {
    const catSlug = r.indicator.category?.slug || 'economy';
    return catSlug === activeCategory || activeCategory === 'economy';
  });

  let filteredRankings = categoryRankings.filter((r) =>
    r.indicator.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
    r.indicator.description?.toLowerCase().includes(filterSearch.toLowerCase())
  );

  if (sortBy === 'rank-asc') {
    filteredRankings.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  } else if (sortBy === 'alphabetical') {
    filteredRankings.sort((a, b) => a.indicator.name.localeCompare(b.indicator.name));
  }

  // Clean Chart Data (Slice top 8 for Bar Chart, top 6 for Radar Chart to prevent text overlap)
  const chartSourceList = [...categoryRankings].sort((a, b) => (a.rank || 999) - (b.rank || 999));

  const categoryBarData = chartSourceList.slice(0, 8).map((r) => ({
    name: r.indicator.name.replace(' Index', '').replace(' Global', '').substring(0, 16),
    'Global Rank (#)': r.rank || 0,
  }));

  const categoryRadarData = chartSourceList.slice(0, 6).map((r) => {
    const rankVal = r.rank || 150;
    const score = Math.max(10, 190 - rankVal);
    return {
      subject: r.indicator.name.replace(' Index', '').replace(' Global', '').substring(0, 14),
      Score: Math.round(score),
    };
  });

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
            <motion.div
              key={activeCategory}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200 shadow-xs flex-shrink-0"
            >
              <Icon className="w-7 h-7" />
            </motion.div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
                  {currentCatObj?.name || 'Category Explorer'}
                </h1>
                <span className="text-sm font-extrabold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] border border-blue-200">
                  {filteredRankings.length} Indicators
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

        {/* 10 Category Tabs Grid with Sliding Pill Animation */}
        <div className="pt-2 flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 relative">
          {categories.map((cat) => {
            const CatIcon = categoryIcons[cat.slug] || Layers;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleTabChange(cat.slug)}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-base font-bold transition-colors whitespace-nowrap z-10 ${
                  isActive
                    ? 'text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A] border border-[#E2E8F0]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-[#2563EB] rounded-xl z-0 shadow-sm"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <CatIcon className="w-4.5 h-4.5" />
                  <span>{cat.name}</span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Category Chart Comparison Matrix */}
      {!loading && categoryRankings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#2563EB]" />
              {currentCatObj?.name || 'Category'} — Visual Benchmark Matrix
            </h2>
            <span className="text-xs text-[#64748B] font-medium">Top Key Metrics Comparison</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <ChartCard
              title={`${currentCatObj?.name || 'Category'} Top Indicators Rank`}
              subtitle={`Global Rank (# Lower is Better) across key ${currentCatObj?.name || ''} indicators`}
              type="bar"
              data={categoryBarData}
              dataKeys={[{ key: 'Global Rank (#)', name: 'Global Rank (#)', color: '#2563EB' }]}
              height={320}
            />

            <ChartCard
              title={`${currentCatObj?.name || 'Category'} Performance Radar`}
              subtitle={`Relative dimension score overview across top ${currentCatObj?.name || ''} metrics`}
              type="radar"
              data={categoryRadarData}
              dataKeys={[{ key: 'Score', name: 'Dimension Score', color: '#10B981' }]}
              height={320}
            />
          </div>
        </div>
      )}

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

      {/* Indicator Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 bg-[#F8FAFC] rounded-2xl animate-pulse border border-[#E2E8F0]"></div>
          ))}
        </div>
      ) : filteredRankings.length > 0 ? (
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredRankings.map((r) => (
            <motion.div key={r.id} variants={itemVariants}>
              <StatCard
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
            </motion.div>
          ))}
        </motion.div>
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
