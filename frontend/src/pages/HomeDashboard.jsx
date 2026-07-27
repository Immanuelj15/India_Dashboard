import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCountryRankings, fetchAISummary, fetchCategories } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { AISummaryCard } from '../components/ui/AISummaryCard';
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
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  ArrowUpDown,
  Layers,
  ChevronRight
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

const TypewriterText = ({ text, speed = 35 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        index++;
        setDisplayed(text.slice(0, index));
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="inline-block">
      {displayed}
      <span className="animate-pulse text-[#2563EB]">|</span>
    </span>
  );
};

export const HomeDashboard = () => {
  const [rankings, setRankings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [aiSummary, setAiSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rank-asc');
  const [quickSearch, setQuickSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [rankingsRes, categoriesRes, aiRes] = await Promise.all([
          fetchCountryRankings('India', 2024),
          fetchCategories(),
          fetchAISummary('India').catch(() => null)
        ]);

        setRankings(rankingsRes || []);
        setCategories(categoriesRes || []);

        if (aiRes) {
          setAiSummary(aiRes);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickSearch.trim())}`);
    }
  };

  const topTierRankings = rankings.filter((r) => r.rank && r.rank <= 50);
  const top10Rankings = rankings.filter((r) => r.rank && r.rank <= 10);
  const validRanksTotal = rankings.map((r) => r.rank).filter((rk) => rk !== undefined && rk !== null);
  const overallAvgRank = validRanksTotal.length > 0 ? Math.round(validRanksTotal.reduce((a, b) => a + b, 0) / validRanksTotal.length) : 'N/A';

  let processedRankings = selectedCategoryFilter === 'all'
    ? [...rankings]
    : rankings.filter((r) => r.indicator.category?.slug === selectedCategoryFilter);

  if (sortBy === 'rank-asc') {
    processedRankings.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  } else if (sortBy === 'alphabetical') {
    processedRankings.sort((a, b) => a.indicator.name.localeCompare(b.indicator.name));
  } else if (sortBy === 'category') {
    processedRankings.sort((a, b) => (a.indicator.category?.name || '').localeCompare(b.indicator.category?.name || ''));
  }

  return (
    <div className="space-y-10 w-full">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="dash-card p-8 sm:p-12 bg-white border border-[#E2E8F0] rounded-3xl shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* National Crest Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#F8FAFC] text-[#0F172A] text-sm font-bold border border-[#E2E8F0]">
              <img src="/india-flag.png" alt="India Flag" className="w-6 h-4 rounded-xs object-cover border border-slate-300" />
              <span className="font-extrabold text-[#2563EB]">India in the World</span>
              <span className="text-[#64748B]">•</span>
              <span className="text-[#64748B]">Official National Analytics Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight flex items-center gap-3 min-h-[56px]">
              <TypewriterText text="India in the World – Global Progress Dashboard" speed={35} />
            </h1>

            <p className="text-lg text-[#64748B] leading-relaxed font-medium">
              Consolidated performance metrics and global indices across Economy, Governance, Technology, Healthcare, Education, Environment, Equality, Safety, and Digital Government from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International.
            </p>

            {/* Quick Search */}
            <form onSubmit={handleHeroSearch} className="max-w-2xl pt-2">
              <div className="relative flex items-center w-full">
                <Search className="w-5 h-5 text-[#64748B] absolute left-4 z-10 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search any global index (e.g. Innovation, GDP, Cyber Security)..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-base text-[#0F172A] rounded-2xl pl-12 pr-32 py-3.5 font-medium focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] transition-all placeholder-[#64748B]"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-extrabold transition-colors shadow-xs"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Official State Emblem of India Display */}
          <div className="hidden lg:flex flex-col items-center p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] min-w-[260px] text-center space-y-3">
            <img src="/india-emblem.png" alt="State Emblem of India" className="w-40 h-44 object-contain" />
          </div>
        </div>
      </motion.div>

      {/* 10 Category Cards Section - Instant Render */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">10 Strategic Global Categories</h2>
          <Link to="/categories" className="text-base font-bold text-[#2563EB] hover:underline flex items-center gap-2">
            Explore All Categories <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.slice(0, 10).map((cat, idx) => {
            const Icon = categoryIcons[cat.slug] || Landmark;
            const catRankings = rankings.filter((r) => r.indicator.category?.slug === cat.slug);
            const validRanks = catRankings.map((r) => r.rank).filter((rk) => rk !== undefined && rk !== null);
            const avgRank = validRanks.length > 0 ? Math.round(validRanks.reduce((a, b) => a + b, 0) / validRanks.length) : 'N/A';

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                whileHover={{ y: -6 }}
                className="dash-card dash-card-hover p-6 flex flex-col justify-between bg-white rounded-2xl border border-[#E2E8F0]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#64748B] bg-[#F8FAFC] px-3 py-1 rounded-lg border border-[#E2E8F0] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#2563EB]" /> {catRankings.length > 0 ? `${catRankings.length} Metrics` : 'Latest'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#0F172A] line-clamp-1">{cat.name}</h3>

                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#64748B]">Avg Rank</div>
                      <div className="text-2xl font-black text-[#0F172A] flex items-center gap-1.5 mt-1">
                        <span>{avgRank !== 'N/A' ? `#${avgRank}` : '—'}</span>
                      </div>
                    </div>

                    <Link
                      to={`/categories?cat=${cat.slug}`}
                      className="inline-flex items-center text-xs font-extrabold text-[#2563EB] hover:text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1.5 rounded-lg border border-blue-200"
                    >
                      View <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Overview Stat Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ y: -4 }} className="dash-card p-6 bg-white rounded-2xl border border-[#E2E8F0] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200 flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#64748B]">Total Tracked Metrics</div>
            <div className="text-2xl font-black text-[#0F172A] mt-0.5">{rankings.length} Indicators</div>
            <div className="text-xs font-semibold text-[#10B981] mt-0.5"> Across 10 Categories</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="dash-card p-6 bg-white rounded-2xl border border-[#E2E8F0] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center border border-emerald-200 flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#64748B]">Top 50 Ranks</div>
            <div className="text-2xl font-black text-[#0F172A] mt-0.5">{topTierRankings.length} Indices</div>
            <div className="text-xs font-semibold text-[#10B981] mt-0.5"> High Performance Tier</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="dash-card p-6 bg-white rounded-2xl border border-[#E2E8F0] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center border border-amber-200 flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#64748B]">Top 10 Benchmark Ranks</div>
            <div className="text-2xl font-black text-[#0F172A] mt-0.5">{top10Rankings.length} Indices</div>
            <div className="text-xs font-semibold text-[#F59E0B] mt-0.5"> Global Leader Tier</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="dash-card p-6 bg-white rounded-2xl border border-[#E2E8F0] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] text-[#64748B] flex items-center justify-center border border-[#E2E8F0] flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#64748B]">Average Global Rank</div>
            <div className="text-2xl font-black text-[#0F172A] mt-0.5">{overallAvgRank !== 'N/A' ? `#${overallAvgRank}` : '—'}</div>
            <div className="text-xs font-semibold text-[#64748B] mt-0.5"> Across All Indicators</div>
          </div>
        </motion.div>
      </div>

      {/* Executive AI Insights Card */}
      {aiSummary && (
        <AISummaryCard
          data={aiSummary}
          title="Executive AI Analysis — India's Global Position"
        />
      )}

      {/* Main Indicator Explorer Matrix */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Global Indicators Matrix</h2>
            <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] border border-blue-200">
              {processedRankings.length} Displayed
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Filter by Category */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm font-medium">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-transparent text-[#0F172A] font-extrabold focus:outline-none cursor-pointer"
              >
                <option value="all">All 10 Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm font-medium">
              <ArrowUpDown className="w-4 h-4 text-[#64748B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#0F172A] font-extrabold focus:outline-none cursor-pointer"
              >
                <option value="rank-asc">Rank (#1 →)</option>
                <option value="alphabetical">Name A-Z</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Indicators Stat Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-[#F8FAFC] rounded-2xl animate-pulse border border-[#E2E8F0]"></div>
            ))}
          </div>
        ) : processedRankings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedRankings.map((r) => (
              <StatCard
                key={r.id}
                title={r.indicator.name}
                category={r.indicator.category?.name || 'Global'}
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
            <h3 className="text-xl font-bold text-[#0F172A]">No Indicators Found</h3>
            <p className="text-base text-[#64748B]">No matching indicators were found for this category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
