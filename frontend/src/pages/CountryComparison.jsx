import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchComparison } from '../api/client';
import { ChartCard } from '../components/ui/ChartCard';
import { ArrowRightLeft, ExternalLink, Scale, AlertCircle } from 'lucide-react';

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

  const sameCountrySelected = country1 === country2;

  const comparisonBarData = comparison && !sameCountrySelected
    ? comparison.comparisons.slice(0, 10).map((c) => ({
        name: c.indicator_name.replace(' Index', '').substring(0, 18),
        [comparison.country1.name]: c.country1_rank || 0,
        [comparison.country2.name]: c.country2_rank || 0,
      }))
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Country Selectors */}
      <div className="glass-panel p-6 rounded-3xl space-y-6 bg-white border-2 border-slate-300 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-sky-800 uppercase tracking-wider mb-1">
            <ArrowRightLeft className="w-4 h-4 text-emerald-700" /> Country vs Country Benchmark
          </div>
          <h1 className="text-2xl font-black text-slate-950">Bilateral Ranking & Metric Comparison</h1>
          <p className="text-xs text-slate-800 font-extrabold">
            Compare India side-by-side with global peers across economic, technological, governance, and social indicators under UX4G guidelines.
          </p>
        </div>

        {/* Dual Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-black text-slate-950">Select First Country</label>
            <select
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="w-full bg-slate-100 border-2 border-slate-400 text-slate-950 text-sm rounded-xl p-3 focus:outline-none focus:border-sky-700 font-black"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center md:col-span-1">
            <div className="w-11 h-11 rounded-full bg-sky-100 border-2 border-sky-400 flex items-center justify-center text-sky-900 font-black text-sm shadow-xs">
              VS
            </div>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-black text-slate-950">Select Second Country</label>
            <select
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className="w-full bg-slate-100 border-2 border-slate-400 text-slate-950 text-sm rounded-xl p-3 focus:outline-none focus:border-sky-700 font-black"
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

      {sameCountrySelected ? (
        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0" />
          <div className="text-xs font-black">
            You have selected <span className="underline">{country1}</span> for both sides. Please choose a different country in the second dropdown to view side-by-side bilateral rankings.
          </div>
        </div>
      ) : loading || !comparison ? (
        <div className="py-12 text-center text-sm text-slate-950 font-black">Loading comparison dataset...</div>
      ) : (
        <div className="space-y-8">
          {/* Comparison Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-8 border-l-sky-700 bg-white border-2 border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{comparison.country1.flag_emoji}</span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-950 border border-sky-300">
                  {comparison.country1.region}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-950">{comparison.country1.name}</h2>
              <p className="text-xs text-slate-900 font-extrabold">
                GDP: {comparison.country1.gdp_usd} • Population: {(comparison.country1.population ? comparison.country1.population / 1e6 : 0).toFixed(1)}M
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-8 border-l-amber-600 bg-white border-2 border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{comparison.country2.flag_emoji}</span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                  {comparison.country2.region}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-950">{comparison.country2.name}</h2>
              <p className="text-xs text-slate-900 font-extrabold">
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
          <div className="glass-panel rounded-2xl overflow-hidden border-2 border-slate-300 bg-white shadow-sm">
            <div className="p-5 border-b-2 border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                <Scale className="w-4 h-4 text-sky-700" />
                Comprehensive Comparison Matrix
              </h3>
              <span className="text-xs text-slate-900 font-black">Year: {comparison.latest_year}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-200 text-slate-950 uppercase tracking-wider font-black border-b-2 border-slate-300">
                  <tr>
                    <th className="p-3.5 pl-5">Category & Indicator</th>
                    <th className="p-3.5 text-center">{comparison.country1.flag_emoji} {comparison.country1.name}</th>
                    <th className="p-3.5 text-center">{comparison.country2.flag_emoji} {comparison.country2.name}</th>
                    <th className="p-3.5 pr-5 text-right">Source Attribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-100 text-slate-950 font-bold">
                  {comparison.comparisons.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-100 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-black text-slate-950">{c.indicator_name}</div>
                        <div className="text-[11px] text-slate-800 font-extrabold">{c.category_name}</div>
                      </td>
                      <td className="p-3.5 text-center font-black">
                        <div className="text-sky-800 text-sm font-black">
                          {c.country1_rank ? `#${c.country1_rank}` : '—'}
                        </div>
                        <div className="text-[11px] text-slate-900 font-extrabold">
                          {c.country1_value !== null ? `${c.country1_value} ${c.unit || ''}` : ''}
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-black">
                        <div className="text-amber-800 text-sm font-black">
                          {c.country2_rank ? `#${c.country2_rank}` : '—'}
                        </div>
                        <div className="text-[11px] text-slate-900 font-extrabold">
                          {c.country2_value !== null ? `${c.country2_value} ${c.unit || ''}` : ''}
                        </div>
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <a
                          href={c.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sky-700 text-slate-950 inline-flex items-center gap-1 font-black underline"
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
