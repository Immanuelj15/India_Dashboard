import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchRankings } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { Grid, TrendingUp, Users, Building2, Cpu, GraduationCap, HeartPulse, Leaf, ShieldCheck, Scale, Globe } from 'lucide-react';

const categoryIconMap = {
  economy: <TrendingUp className="w-4 h-4 text-emerald-400" />,
  society: <Users className="w-4 h-4 text-accent-cyan" />,
  governance: <Building2 className="w-4 h-4 text-amber-400" />,
  'technology-innovation': <Cpu className="w-4 h-4 text-accent-violet" />,
  education: <GraduationCap className="w-4 h-4 text-blue-400" />,
  healthcare: <HeartPulse className="w-4 h-4 text-rose-400" />,
  environment: <Leaf className="w-4 h-4 text-emerald-500" />,
  safety: <ShieldCheck className="w-4 h-4 text-accent-saffron" />,
  equality: <Scale className="w-4 h-4 text-purple-400" />,
  'digital-government': <Globe className="w-4 h-4 text-teal-400" />,
};

export const CategoryExplorer = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('economy');
  const [rankings, setRankings] = useState([]);
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="glass-panel p-6 rounded-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-primary-400 uppercase tracking-wider">
          <Grid className="w-4 h-4" /> Domain Exploration
        </div>
        <h1 className="text-2xl font-extrabold text-white">Category Explorer</h1>
        <p className="text-xs text-gray-400">
          Browse India's global indices across 10 core dimensions of economic and social development.
        </p>
      </div>

      {/* 10 Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.slug === activeCategory;
          const icon = categoryIconMap[cat.slug] || <Grid className="w-4 h-4 text-gray-400" />;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 border border-primary-500'
                  : 'bg-surface-card hover:bg-surface-border text-gray-300 border border-surface-border'
              }`}
            >
              {icon}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Banner */}
      {currentCatObj && (
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary-500 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {categoryIconMap[currentCatObj.slug]}
              {currentCatObj.name} Indicators
            </h2>
            <p className="text-xs text-gray-400 mt-1">{currentCatObj.description}</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
            {rankings.length} Indicators Listed
          </span>
        </div>
      )}

      {/* Indicator Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-52 glass-panel rounded-2xl animate-pulse bg-surface-card"></div>
          ))}
        </div>
      ) : rankings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankings.map((r) => (
            <StatCard
              key={r.id}
              title={r.indicator.name}
              category={currentCatObj?.name || 'Category'}
              rank={r.rank}
              value={r.value}
              unit={r.unit}
              trend="up"
              trendText="Official Benchmark"
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
        <div className="py-12 text-center text-xs text-gray-400 glass-panel rounded-2xl">
          No indicators found for this category.
        </div>
      )}
    </div>
  );
};
