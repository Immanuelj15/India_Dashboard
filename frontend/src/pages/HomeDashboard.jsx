import React, { useEffect, useState } from 'react';
import { fetchCountryRankings, fetchAISummary, fetchCategories } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { AISummaryCard } from '../components/ui/AISummaryCard';
import { ChartCard } from '../components/ui/ChartCard';
import { Globe, Shield, Trophy } from 'lucide-react';

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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="glass-panel-dark p-6 lg:p-7 rounded-3xl relative overflow-hidden text-white">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-amber-500 text-slate-950">
              National Progress Tracker
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            India in the World — Global Progress Dashboard
          </h1>

          <p className="text-xs text-sky-100 font-extrabold leading-relaxed">
            Consolidating India’s performance across 70+ trusted international indices from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-black">
            <div className="flex items-center gap-1 bg-amber-500/20 text-amber-200 px-3 py-1 rounded-lg border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5 text-amber-300" /> #5 Nominal GDP
            </div>
            <div className="flex items-center gap-1 bg-sky-500/20 text-sky-100 px-3 py-1 rounded-lg border border-sky-300/30">
              <Globe className="w-3.5 h-3.5 text-sky-200" /> #39 Global Innovation
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-100 px-3 py-1 rounded-lg border border-emerald-300/30">
              <Shield className="w-3.5 h-3.5 text-emerald-300" /> #10 Cybersecurity
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Section */}
      <AISummaryCard
        data={aiSummary}
        loading={aiLoading}
        onRefresh={loadAISummary}
        title="India Global Standing — Executive AI Summary"
      />

      {/* Key Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard
          title="Category Performance Overview"
          subtitle="Relative strength score across 10 global indicator categories"
          type="radar"
          data={categoryRadarData}
          dataKeys={[{ key: 'Score', name: 'Dimension Score', color: '#0284c7' }]}
          height={300}
        />

        <ChartCard
          title="Flagship Rankings Comparison"
          subtitle="India's position across key international benchmarks (# Lower is Better)"
          type="bar"
          data={flagshipRankings.map((r) => ({
            name: r.indicator.name.replace(' Index', '').replace(' Global', ''),
            Rank: r.rank || 0,
          }))}
          dataKeys={[{ key: 'Rank', name: 'Global Rank (#)', color: '#0284c7' }]}
          height={300}
        />
      </div>

      {/* Indicator Explorer Header & Quick Filter Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">Key Global Indicators</h2>
          <span className="text-xs font-black text-slate-950 bg-slate-200 px-2.5 py-0.5 rounded-full border border-slate-300">
            {filteredRankings.length} Indicators
          </span>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-black whitespace-nowrap transition-all ${
              selectedCategoryFilter === 'all'
                ? 'bg-sky-800 text-white border border-sky-900'
                : 'bg-slate-200 text-slate-950 border border-slate-300 hover:bg-slate-300'
            }`}
          >
            All ({rankings.length})
          </button>
          {categories.map((cat) => {
            const count = rankings.filter((r) => r.indicator.category?.slug === cat.slug).length;
            if (count === 0) return null;
            const isSelected = selectedCategoryFilter === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategoryFilter(cat.slug)}
                className={`px-3 py-1 rounded-lg text-xs font-black whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-800 text-white border border-sky-900'
                    : 'bg-slate-200 text-slate-950 border border-slate-300 hover:bg-slate-300'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Stat Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-48 glass-panel rounded-2xl animate-pulse bg-slate-200 border border-slate-300"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRankings.map((r) => (
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
        )}
      </div>
    </div>
  );
};
