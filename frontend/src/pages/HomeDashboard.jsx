import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCountryRankings, fetchAISummary, fetchCategories } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { AISummaryCard } from '../components/ui/AISummaryCard';
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
  TrendingUp,
  LayoutGrid,
  List,
  ArrowUpDown,
  Download,
  ArrowRight,
  MapPin,
  Sparkles,
  Clock
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

export const HomeDashboard = () => {
  const [rankings, setRankings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rank-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [quickSearch, setQuickSearch] = useState('');
  const [aiSummary, setAiSummary] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const [rankRes, catRes] = await Promise.all([
        fetchCountryRankings('India', 2024),
        fetchCategories(),
      ]);
      setRankings(rankRes);
      setCategories(catRes);

      loadAISummary();
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAISummary = async () => {
    setAiLoading(true);
    try {
      const summaryRes = await fetchAISummary('India');
      setAiSummary(summaryRes);
    } catch (err) {
      console.error('Error fetching AI summary:', err);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickSearch.trim())}`);
    }
  };

  const handleExportCSV = () => {
    if (!processedRankings || processedRankings.length === 0) return;
    const headers = ['Indicator Name', 'Category', 'Global Rank', 'Value', 'Unit', 'Source'];
    const rows = processedRankings.map((r) => [
      `"${r.indicator.name.replace(/"/g, '""')}"`,
      `"${(r.indicator.category?.name || 'General').replace(/"/g, '""')}"`,
      r.rank !== null && r.rank !== undefined ? r.rank : 'N/A',
      r.value !== null && r.value !== undefined ? r.value : 'N/A',
      `"${(r.unit || '').replace(/"/g, '""')}"`,
      `"${(r.source?.name || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'India_Global_Progress_Report_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoryRadarData = categories.map((cat) => {
    const catRankings = rankings.filter((r) => r.indicator.category?.slug === cat.slug);
    const validRanks = catRankings.map((r) => r.rank).filter((rk) => rk !== undefined && rk !== null);
    const avgRank = validRanks.length > 0 ? validRanks.reduce((a, b) => a + b, 0) / validRanks.length : 100;
    const score = Math.max(10, 150 - avgRank);

    return {
      subject: cat.name.replace(' & Innovation', ''),
      Score: Math.round(score),
    };
  });

  const flagshipRankings = rankings.filter((r) =>
    ['gdp-rank', 'global-innovation-index', 'ai-readiness-index', 'global-cybersecurity-index', 'e-government-development-index', 'corruption-perceptions-index', 'climate-change-performance-index', 'startup-ecosystem-ranking'].includes(r.indicator.slug)
  );

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
    <div className="space-y-8 w-full">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="dash-card p-6 sm:p-8 bg-white border border-[#E2E8F0] rounded-xl shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* National Crest Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold border border-[#E2E8F0]">
              <img src="/india-flag.png" alt="India Flag" className="w-5 h-3.5 rounded-xs object-cover border border-slate-300" />
              <span className="font-bold text-[#2563EB]">India in the World</span>
              <span className="text-[#64748B]">•</span>
              <span className="text-[#64748B]">Official National Analytics Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight flex items-center gap-3">
              India in the World – Global Progress Dashboard
            </h1>

            <p className="text-sm text-[#64748B] leading-relaxed font-normal">
              Consolidated performance metrics and global indices across Economy, Governance, Technology, Healthcare, Education, Environment, Equality, Safety, and Digital Government from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International.
            </p>

            {/* Quick Search */}
            <form onSubmit={handleHeroSearch} className="relative max-w-xl pt-1">
              <input
                type="text"
                placeholder="Search any global index (e.g. Innovation, GDP, Cyber Security)..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] rounded-lg pl-10 pr-24 py-2.5 font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all placeholder-[#64748B]"
              />
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-4" />
              <button
                type="submit"
                className="absolute right-1.5 top-2 px-3.5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Search
              </button>
            </form>
          </div>

          {/* Official State Emblem of India Display */}
          <div className="hidden lg:flex flex-col items-center p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] min-w-[210px] text-center space-y-2">
            <img src="/india-emblem.png" alt="State Emblem of India" className="w-32 h-36 object-contain" />
          </div>
        </div>
      </motion.div>

      {/* 10 Category Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0F172A] tracking-tight">10 Strategic Global Categories</h2>
          <Link to="/categories" className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1">
            Explore All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((cat) => {
            const Icon = categoryIcons[cat.slug] || Landmark;
            const catRankings = rankings.filter((r) => r.indicator.category?.slug === cat.slug);
            const validRanks = catRankings.map((r) => r.rank).filter((rk) => rk !== undefined && rk !== null);
            const avgRank = validRanks.length > 0 ? Math.round(validRanks.reduce((a, b) => a + b, 0) / validRanks.length) : 'N/A';

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="dash-card dash-card-hover p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#64748B]" /> 2024
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#0F172A] line-clamp-1">{cat.name}</h3>

                  <div className="mt-2 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] font-medium text-[#64748B]">Avg Rank</div>
                      <div className="text-lg font-extrabold text-[#0F172A] flex items-center gap-1">
                        <span>{avgRank !== 'N/A' ? `#${avgRank}` : '—'}</span>
                        <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-[#64748B]">{catRankings.length} Indicators</span>
                  </div>
                </div>

                <Link
                  to={`/categories?cat=${cat.slug}`}
                  className="mt-4 w-full text-center py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-blue-300 text-[11px] font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                >
                  Quick View
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Summary Section */}
      <AISummaryCard
        data={aiSummary}
        loading={aiLoading}
        onRefresh={loadAISummary}
        title="India Executive AI Summary"
      />

      {/* Interactive World Map Section */}
      <div className="dash-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
            <MapPin className="w-4 h-4" /> Global Geospatial Comparison
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">Interactive World Map Explorer</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Visualize global rank distributions and compare India with 190+ countries using interactive Leaflet map overlays and country popup telemetry.
          </p>
        </div>

        <Link
          to="/map"
          className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
        >
          <span>Launch World Map</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Top Insights & Charts Row */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#0F172A] tracking-tight">Top Performance Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Category Performance Overview"
            subtitle="Relative strength score across 10 global indicator categories"
            type="radar"
            data={categoryRadarData}
            dataKeys={[{ key: 'Score', name: 'Dimension Score', color: '#2563EB' }]}
            height={280}
          />

          <ChartCard
            title="Flagship Rankings Comparison"
            subtitle="India's position across key international benchmarks (# Lower is Better)"
            type="bar"
            data={flagshipRankings.map((r) => ({
              name: r.indicator.name.replace(' Index', '').replace(' Global', ''),
              Rank: r.rank || 0,
            }))}
            dataKeys={[{ key: 'Rank', name: 'Global Rank (#)', color: '#2563EB' }]}
            height={280}
          />
        </div>
      </div>

      {/* Recent Updates / Indicator Data Grid */}
      <div className="dash-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">Global Indicator Data Grid</h2>
            <p className="text-xs text-[#64748B]">Showing {processedRankings.length} verified indicators</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
              title="Export Report to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <div className="flex items-center gap-1 bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0] text-xs font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-[#64748B]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#0F172A] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="rank-asc">Top Ranks (#1 →)</option>
                <option value="alphabetical">A-Z</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div className="flex items-center bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategoryFilter === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A] border border-[#E2E8F0]'
            }`}
          >
            All Categories ({rankings.length})
          </button>
          {categories.map((cat) => {
            const count = rankings.filter((r) => r.indicator.category?.slug === cat.slug).length;
            if (count === 0) return null;
            const isSelected = selectedCategoryFilter === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategoryFilter(cat.slug)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A] border border-[#E2E8F0]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Render Grid vs Table */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-44 bg-[#F8FAFC] rounded-xl animate-pulse border border-[#E2E8F0]"></div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {processedRankings.map((r) => (
              <StatCard
                key={r.id}
                title={r.indicator.name}
                category={r.indicator.category?.name || 'General'}
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
          <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#0F172A] uppercase tracking-wider font-semibold border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-3 pl-4">Indicator Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-center">Global Rank</th>
                  <th className="p-3">Metric Value</th>
                  <th className="p-3 text-right pr-4">Source Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A] font-medium">
                {processedRankings.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="p-3 pl-4">
                      <div className="font-semibold text-[#0F172A]">{r.indicator.name}</div>
                      <div className="text-[11px] text-[#64748B] line-clamp-1">{r.indicator.description}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] text-[11px] font-semibold border border-blue-200">
                        {r.indicator.category?.name}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-[#2563EB] text-sm">
                      {r.rank ? `#${r.rank}` : '—'}
                    </td>
                    <td className="p-3 font-mono font-semibold text-[#0F172A]">
                      {r.value} {r.unit || ''}
                    </td>
                    <td className="p-3 text-right pr-4 text-[#64748B]">
                      <a href={r.source?.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] underline">
                        {r.source?.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
