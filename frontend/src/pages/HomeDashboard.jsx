import React, { useEffect, useState } from 'react';
import { fetchCountryRankings, fetchAISummary, fetchCategories } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { AISummaryCard } from '../components/ui/AISummaryCard';
import { ChartCard } from '../components/ui/ChartCard';
import { Globe, Shield, Trophy, LayoutGrid, List, ArrowUpDown, Star, Sparkles } from 'lucide-react';

export const HomeDashboard = () => {
  const [rankings, setRankings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rank-asc');
  const [viewMode, setViewMode] = useState('grid');
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

  const topRankedIndicators = [...rankings]
    .filter((r) => r.rank !== null && r.rank !== undefined)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full">
      {/* Hero Banner */}
      <div className="glass-panel-dark p-6 lg:p-8 rounded-3xl relative overflow-hidden text-white shadow-xl border-2 border-sky-600">
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇮🇳</span>
            <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm">
              National Progress Tracker
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
            India in the World — Global Progress Dashboard
          </h1>

          <p className="text-xs text-sky-100 font-extrabold leading-relaxed drop-shadow-2xs">
            Consolidating India’s performance across 70+ trusted international indices from the World Bank, UN, IMF, WEF, WHO, WIPO, and Transparency International.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-black">
            <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-200 px-3.5 py-1.5 rounded-xl border border-amber-400/30 backdrop-blur-md">
              <Trophy className="w-4 h-4 text-amber-300" /> #5 Nominal GDP
            </div>
            <div className="flex items-center gap-1.5 bg-sky-500/20 text-sky-100 px-3.5 py-1.5 rounded-xl border border-sky-300/30 backdrop-blur-md">
              <Globe className="w-4 h-4 text-sky-200" /> #39 Global Innovation
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300/30 backdrop-blur-md">
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
        title="India Global Standing — Executive AI Summary"
      />

      {/* Top 5 Key Achievements Row */}
      {topRankedIndicators.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-black text-slate-950 uppercase tracking-wider">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" /> Top Global Ranking Highlights
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
            {topRankedIndicators.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-sky-300 shadow-xs hover:border-sky-500 hover:shadow-premium transition-all flex flex-col justify-between"
              >
                <div className="text-[10px] font-black uppercase text-slate-600 line-clamp-1">
                  {item.indicator.category?.name}
                </div>
                <div className="font-black text-slate-950 text-xs my-1 line-clamp-1">
                  {item.indicator.name}
                </div>
                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-100">
                  <span className="text-xl font-black text-sky-700">#{item.rank}</span>
                  <span className="text-[11px] font-bold text-slate-800">{item.value} {item.unit || ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Grid Controls Header: Filter, Sort & View Mode */}
      <div className="glass-panel p-4 rounded-2xl bg-white border border-slate-300 space-y-3 shadow-premium">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-950 tracking-tight">Global Indicator Grid</h2>
            <span className="text-xs font-black text-slate-950 bg-slate-200 px-2.5 py-0.5 rounded-full border border-slate-300">
              {processedRankings.length} Indicators
            </span>
          </div>

          {/* Sort & View Mode Toolbar */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-sky-700" />
              <span className="text-slate-600 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-950 font-black focus:outline-none cursor-pointer"
              >
                <option value="rank-asc">Top Ranks First (#1 →)</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="category">By Domain / Category</option>
              </select>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
              selectedCategoryFilter === 'all'
                ? 'bg-sky-800 text-white border border-sky-900 shadow-xs'
                : 'bg-slate-100 text-slate-950 border border-slate-300 hover:bg-slate-200'
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-800 text-white border border-sky-900 shadow-xs'
                    : 'bg-slate-100 text-slate-950 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Grid vs Table View */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-48 glass-panel rounded-2xl animate-pulse bg-slate-200 border border-slate-300"></div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
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
        /* High-Density Executive Table View */
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-300 bg-white shadow-premium">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-950 uppercase tracking-wider font-black border-b border-slate-300">
                <tr>
                  <th className="p-3.5 pl-4">Indicator Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-center">Global Rank</th>
                  <th className="p-3.5">Value</th>
                  <th className="p-3.5 text-right pr-4">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-950 font-bold">
                {processedRankings.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-4">
                      <div className="font-black text-slate-950 text-xs">{r.indicator.name}</div>
                      <div className="text-[10px] text-slate-700 line-clamp-1">{r.indicator.description}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-950 font-black text-[10px] border border-sky-300">
                        {r.indicator.category?.name}
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-black text-sky-800 text-sm">
                      {r.rank ? `#${r.rank}` : '—'}
                    </td>
                    <td className="p-3.5 font-mono font-black text-slate-950">
                      {r.value} {r.unit || ''}
                    </td>
                    <td className="p-3.5 text-right pr-4 text-slate-800 font-bold">
                      <a href={r.source?.url} target="_blank" rel="noopener noreferrer" className="hover:text-sky-700 underline">
                        {r.source?.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
