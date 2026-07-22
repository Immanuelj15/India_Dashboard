import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchComparison } from '../api/client';
import { ChartCard } from '../components/ui/ChartCard';
import { ArrowRightLeft, ExternalLink, Scale } from 'lucide-react';

export const CountryComparison = () => {
  const [countries, setCountries] = useState([]);
  const [country1, setCountry1] = useState('India');
  const [country2, setCountry2] = useState('Japan');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries().then(setCountries).catch(console.error);
  }, []);

  const loadComparison = async () => {
    if (!country1 || !country2) return;
    setLoading(true);
    try {
      const data = await fetchComparison(country1, country2);
      setComparison(data);
    } catch (err) {
      console.error('Error fetching comparison:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComparison();
  }, [country1, country2]);

  const comparisonBarData = comparison
    ? comparison.comparisons.slice(0, 10).map((c) => ({
        name: c.indicator_name.replace(' Index', '').substring(0, 18),
        [comparison.country1.name]: c.country1_rank || 0,
        [comparison.country2.name]: c.country2_rank || 0,
      }))
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Country Selectors */}
      <div className="glass-panel p-6 rounded-3xl space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-accent-cyan uppercase tracking-wider mb-1">
            <ArrowRightLeft className="w-4 h-4" /> Country vs Country Benchmark
          </div>
          <h1 className="text-2xl font-extrabold text-white">Bilateral Ranking & Metric Comparison</h1>
          <p className="text-xs text-gray-400">
            Compare India side-by-side with global peers across economic, technological, governance, and social indicators.
          </p>
        </div>

        {/* Dual Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Select First Country</label>
            <select
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="w-full bg-surface-card border border-surface-border text-white text-sm rounded-xl p-3 focus:outline-none focus:border-primary-500"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-accent-cyan font-bold">
              VS
            </div>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Select Second Country</label>
            <select
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className="w-full bg-surface-card border border-surface-border text-white text-sm rounded-xl p-3 focus:outline-none focus:border-primary-500"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading || !comparison ? (
        <div className="py-12 text-center text-sm text-gray-400">Loading comparison dataset...</div>
      ) : (
        <div className="space-y-8">
          {/* Comparison Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary-500 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{comparison.country1.flag_emoji}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-500/10 text-primary-400">
                  {comparison.country1.region}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">{comparison.country1.name}</h2>
              <p className="text-xs text-gray-400">
                GDP: {comparison.country1.gdp_usd} • Population: {(comparison.country1.population ? comparison.country1.population / 1e6 : 0).toFixed(1)}M
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-accent-saffron space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{comparison.country2.flag_emoji}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent-saffron/10 text-accent-saffron">
                  {comparison.country2.region}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">{comparison.country2.name}</h2>
              <p className="text-xs text-gray-400">
                GDP: {comparison.country2.gdp_usd} • Population: {(comparison.country2.population ? comparison.country2.population / 1e6 : 0).toFixed(1)}M
              </p>
            </div>
          </div>

          {/* Recharts Bar Comparison Chart */}
          <ChartCard
            title={`Global Rank Comparison (# Lower is Better)`}
            subtitle={`Side-by-side indicator rankings between ${comparison.country1.name} and ${comparison.country2.name}`}
            type="bar"
            data={comparisonBarData}
            dataKeys={[
              { key: comparison.country1.name, name: comparison.country1.name, color: '#3b82f6' },
              { key: comparison.country2.name, name: comparison.country2.name, color: '#ff9933' },
            ]}
            height={340}
          />

          {/* Full Comparison Table */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-surface-border">
            <div className="p-5 border-b border-surface-border flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                Comprehensive Comparison Matrix
              </h3>
              <span className="text-xs text-gray-400">Year: {comparison.latest_year}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-card text-gray-400 uppercase tracking-wider font-semibold border-b border-surface-border">
                  <tr>
                    <th className="p-3.5 pl-5">Category & Indicator</th>
                    <th className="p-3.5 text-center">{comparison.country1.flag_emoji} {comparison.country1.name}</th>
                    <th className="p-3.5 text-center">{comparison.country2.flag_emoji} {comparison.country2.name}</th>
                    <th className="p-3.5 pr-5 text-right">Source Attribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50 text-gray-200">
                  {comparison.comparisons.map((c, idx) => (
                    <tr key={idx} className="hover:bg-surface-card/50 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-semibold text-white">{c.indicator_name}</div>
                        <div className="text-[11px] text-gray-400">{c.category_name}</div>
                      </td>
                      <td className="p-3.5 text-center font-bold">
                        <div className="text-accent-saffron text-sm">
                          {c.country1_rank ? `#${c.country1_rank}` : '—'}
                        </div>
                        <div className="text-[11px] text-gray-400 font-normal">
                          {c.country1_value !== null ? `${c.country1_value} ${c.unit || ''}` : ''}
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-bold">
                        <div className="text-primary-400 text-sm">
                          {c.country2_rank ? `#${c.country2_rank}` : '—'}
                        </div>
                        <div className="text-[11px] text-gray-400 font-normal">
                          {c.country2_value !== null ? `${c.country2_value} ${c.unit || ''}` : ''}
                        </div>
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <a
                          href={c.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-400 text-gray-400 inline-flex items-center gap-1"
                        >
                          {c.source_name} <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
