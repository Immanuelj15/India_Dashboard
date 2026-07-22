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
      <div className="glass-panel p-6 rounded-3xl space-y-6 bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
            <ArrowRightLeft className="w-4 h-4" /> Country vs Country Benchmark
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Bilateral Ranking & Metric Comparison</h1>
          <p className="text-xs text-slate-500 font-medium">
            Compare India side-by-side with global peers across economic, technological, governance, and social indicators under UX4G guidelines.
          </p>
        </div>

        {/* Dual Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Select First Country</label>
            <select
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 focus:outline-none focus:border-sky-600 focus:bg-white font-medium"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 font-bold">
              VS
            </div>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Select Second Country</label>
            <select
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 focus:outline-none focus:border-sky-600 focus:bg-white font-medium"
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
        <div className="py-12 text-center text-sm text-slate-500 font-medium">Loading comparison dataset...</div>
      ) : (
        <div className="space-y-8">
          {/* Comparison Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-sky-600 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{comparison.country1.flag_emoji}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                  {comparison.country1.region}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{comparison.country1.name}</h2>
              <p className="text-xs text-slate-500 font-medium">
                GDP: {comparison.country1.gdp_usd} • Population: {(comparison.country1.population ? comparison.country1.population / 1e6 : 0).toFixed(1)}M
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-amber-500 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{comparison.country2.flag_emoji}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  {comparison.country2.region}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{comparison.country2.name}</h2>
              <p className="text-xs text-slate-500 font-medium">
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
              { key: comparison.country1.name, name: comparison.country1.name, color: '#0284c7' },
              { key: comparison.country2.name, name: comparison.country2.name, color: '#d97706' },
            ]}
            height={340}
          />

          {/* Full Comparison Table */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-sky-600" />
                Comprehensive Comparison Matrix
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Year: {comparison.latest_year}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5 pl-5">Category & Indicator</th>
                    <th className="p-3.5 text-center">{comparison.country1.flag_emoji} {comparison.country1.name}</th>
                    <th className="p-3.5 text-center">{comparison.country2.flag_emoji} {comparison.country2.name}</th>
                    <th className="p-3.5 pr-5 text-right">Source Attribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {comparison.comparisons.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-bold text-slate-900">{c.indicator_name}</div>
                        <div className="text-[11px] text-slate-500">{c.category_name}</div>
                      </td>
                      <td className="p-3.5 text-center font-bold">
                        <div className="text-sky-700 text-sm">
                          {c.country1_rank ? `#${c.country1_rank}` : '—'}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          {c.country1_value !== null ? `${c.country1_value} ${c.unit || ''}` : ''}
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-bold">
                        <div className="text-amber-700 text-sm">
                          {c.country2_rank ? `#${c.country2_rank}` : '—'}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          {c.country2_value !== null ? `${c.country2_value} ${c.unit || ''}` : ''}
                        </div>
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <a
                          href={c.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-600 text-slate-500 inline-flex items-center gap-1 font-medium"
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
