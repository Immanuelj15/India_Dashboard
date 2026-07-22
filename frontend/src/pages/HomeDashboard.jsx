import React, { useEffect, useState } from 'react';
import { fetchCountryRankings, fetchAISummary, fetchCategories } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { AISummaryCard } from '../components/ui/AISummaryCard';
import { ChartCard } from '../components/ui/ChartCard';
import { Globe, Shield, Trophy } from 'lucide-react';

export const HomeDashboard = () => {
  const [rankings, setRankings] = useState([]);
  const [categories, setCategories] = useState([]);
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-surface-card via-surface to-background border border-surface-border">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-accent-saffron/10 text-accent-saffron border border-accent-saffron/20">
              National Progress Tracking
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            India in the World — Global Progress Dashboard
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed font-normal">
            Consolidating India’s performance across 70+ trusted international indices from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-gray-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Trophy className="w-4 h-4" /> #5 Nominal GDP
            </div>
            <div className="flex items-center gap-1.5 text-accent-cyan">
              <Globe className="w-4 h-4" /> #39 Global Innovation
            </div>
            <div className="flex items-center gap-1.5 text-accent-violet">
              <Shield className="w-4 h-4" /> #10 Cybersecurity Index
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary-500/10 to-transparent pointer-events-none hidden lg:block"></div>
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
          dataKeys={[{ key: 'Score', name: 'Dimension Score', color: '#ff9933' }]}
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
          dataKeys={[{ key: 'Rank', name: 'Global Rank (#)', color: '#3b82f6' }]}
          height={320}
        />
      </div>

      {/* Flagship Indicator Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Key Global Indicators</h2>
            <p className="text-xs text-gray-400">India's rankings, metrics, trends, and official source links.</p>
          </div>
          <span className="text-xs font-medium text-gray-400">{rankings.length} Indicators Loaded</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-56 glass-panel rounded-2xl animate-pulse bg-surface-card"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rankings.map((r) => (
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
