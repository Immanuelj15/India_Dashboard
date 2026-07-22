import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchRankings } from '../api/client';
import { StatCard } from '../components/ui/StatCard';
import { Grid, TrendingUp, Users, Building2, Cpu, GraduationCap, HeartPulse, Leaf, ShieldCheck, Scale, Globe } from 'lucide-react';

const categoryIconMap = {
  economy: <TrendingUp className="w-4 h-4 text-emerald-700" />,
  society: <Users className="w-4 h-4 text-sky-700" />,
  governance: <Building2 className="w-4 h-4 text-amber-700" />,
  'technology-innovation': <Cpu className="w-4 h-4 text-indigo-700" />,
  education: <GraduationCap className="w-4 h-4 text-blue-700" />,
  healthcare: <HeartPulse className="w-4 h-4 text-rose-700" />,
  environment: <Leaf className="w-4 h-4 text-emerald-700" />,
  safety: <ShieldCheck className="w-4 h-4 text-amber-700" />,
  equality: <Scale className="w-4 h-4 text-purple-700" />,
  'digital-government': <Globe className="w-4 h-4 text-teal-700" />,
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
      <div className="glass-panel p-6 rounded-3xl space-y-2 bg-white border-2 border-slate-300 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-black text-sky-800 uppercase tracking-wider">
          <Grid className="w-4 h-4" /> Domain Exploration
        </div>
        <h1 className="text-2xl font-black text-slate-950">Category Explorer</h1>
        <p className="text-xs text-slate-800 font-extrabold">
          Browse India's global indices across 10 core dimensions of economic and social development.
        </p>
      </div>

      {/* 10 Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.slug === activeCategory;
          const icon = categoryIconMap[cat.slug] || <Grid className="w-4 h-4 text-slate-700" />;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-800 text-white shadow-md border-2 border-sky-900'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-950 border-2 border-slate-400'
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
        <div className="glass-panel p-6 rounded-2xl border-l-8 border-l-sky-700 bg-white border-2 border-slate-300 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-xl font-black text-slate-950 flex items-center gap-2">
              {categoryIconMap[currentCatObj.slug]}
              {currentCatObj.name} Indicators
            </h2>
            <p className="text-xs text-slate-800 font-extrabold mt-1">{currentCatObj.description}</p>
          </div>
          <span className="text-xs font-black px-3.5 py-1 rounded-full bg-sky-100 text-sky-950 border border-sky-400">
            {rankings.length} Indicators Listed
          </span>
        </div>
      )}

      {/* Indicator Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-52 glass-panel rounded-2xl animate-pulse bg-slate-200 border-2 border-slate-300"></div>
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
        <div className="py-12 text-center text-xs text-slate-950 font-black glass-panel rounded-2xl bg-white border-2 border-slate-300">
          No indicators found for this category.
        </div>
      )}
    </div>
  );
};
