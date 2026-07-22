import React, { useEffect, useState } from 'react';
import { fetchCountryRankings, fetchAISummary, fetchCategories } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { AISummaryCard } from '../components/ui/AISummaryCard';
import { ChartCard } from '../components/ui/ChartCard';
import { Globe, Shield, Trophy, Award } from 'lucide-react';

export const HomeDashboard = () => {
  const [rankings, setRankings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [aiSummary, setAiSummary] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

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

  const filteredRankings = selectedCategoryFilter === 'all'
    ? rankings
    : rankings.filter((r) => r.indicator.category?.slug === selectedCategoryFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner — High-Contrast Rich Dark Blue Glass Header */}
      <div className="glass-panel-dark p-6 lg:p-8 rounded-3xl relative overflow-hidden text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇮🇳</span>
            <span className="text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 border border-amber-300 shadow-sm">
              National Development Framework
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
            India in the World — Global Progress Dashboard
          </h1>

          <p className="text-sm text-sky-100 leading-relaxed font-extrabold drop-shadow-2xs">
            Consolidating India’s performance across 70+ trusted international indices from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International under UX4G Digital Governance Standards.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-black text-white">
            <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-200 px-3.5 py-1.5 rounded-xl border border-amber-400/40 backdrop-blur-md">
              <Trophy className="w-4 h-4 text-amber-300" /> #5 Nominal GDP
            </div>
            <div className="flex items-center gap-1.5 bg-sky-500/20 text-sky-100 px-3.5 py-1.5 rounded-xl border border-sky-300/40 backdrop-blur-md">
              <Globe className="w-4 h-4 text-sky-200" /> #39 Global Innovation
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300/40 backdrop-blur-md">
              <Shield className="w-4 h-4 text-emerald-300" /> #10 Cybersecurity Index
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/20 via-sky-500/10 to-transparent pointer-events-none hidden lg:block"></div>
      </div>

      {/* AI Summary Section */}
      <AISummaryCard
        data={aiSummary}
        loading={aiLoading}
        onRefresh={loadAISummary}
        title="India Global Standing — AI Summary"
      />

      {/* Key Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Category Performance Radar"
          subtitle="Normalized strength across 10 global indicator dimensions (Higher score = Better relative global rank)"
          type="radar"
          data={categoryRadarData}
          dataKeys={[{ key: 'Score', name: 'Dimension Score', color: '#0284c7' }]}
          height={320}
        />

        <ChartCard
          title="Flagship Rankings Comparison"
          subtitle="India's rank across core economic, tech, and governance benchmark indices (Lower rank # = Top Position)"
          type="bar"
          data={flagshipRankings.map((r) => ({
            name: r.indicator.name.replace(' Index', '').replace(' Global', ''),
            Rank: r.rank || 0,
          }))}
          dataKeys={[{ key: 'Rank', name: 'Global Rank (#)', color: '#0284c7' }]}
          height={320}
        />
      </div>

      {/* Indicator Explorer Header & Quick Filter Pills */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-950 tracking-tight">Key Global Indicators</h2>
            <p className="text-xs text-slate-800 font-extrabold">India's rankings, metrics, trends, and official source links.</p>
          </div>
          <span className="text-xs font-black text-slate-950 bg-slate-200 px-3 py-1 rounded-full border border-slate-400 self-start sm:self-auto">
            {filteredRankings.length} Indicators Shown
          </span>
        </div>

        {/* Quick Filter Pill Buttons with High Contrast */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
              selectedCategoryFilter === 'all'
                ? 'bg-sky-800 text-white border-2 border-sky-900 shadow-xs'
                : 'bg-slate-200 text-slate-950 border-2 border-slate-400 hover:bg-slate-300'
            }`}
          >
            All Indicators ({rankings.length})
          </button>
          {categories.map((cat) => {
            const count = rankings.filter((r) => r.indicator.category?.slug === cat.slug).length;
            if (count === 0) return null;
            const isSelected = selectedCategoryFilter === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategoryFilter(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-800 text-white border-2 border-sky-900 shadow-xs'
                    : 'bg-slate-200 text-slate-950 border-2 border-slate-400 hover:bg-slate-300'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Stat Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-56 glass-panel rounded-2xl animate-pulse bg-slate-200 border-2 border-slate-300"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRankings.map((r) => (
              <StatCard
                key={r.id}
                title={r.indicator.name}
                category={r.indicator.category?.name || 'General'}
                rank={r.rank}
                value={r.value}
                unit={r.unit}
                trend="up"
                trendText="Consolidated 2024 Record"
                sourceName={r.source?.name}
                sourceUrl={r.source?.url}
                lastUpdated={r.last_updated}
                description={r.indicator.description}
                flagEmoji="🇮🇳"
                countryName="India"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
