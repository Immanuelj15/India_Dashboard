import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchComparison } from '../api/client';
import { ChartCard } from '../components/ui/ChartCard';
import { GitCompare, ExternalLink, Scale, AlertCircle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const comparisonRadarData = comparison && !sameCountrySelected
    ? comparison.comparisons.slice(0, 8).map((c) => ({
        subject: c.indicator_name.replace(' Index', '').substring(0, 14),
        [comparison.country1.name]: c.country1_rank ? Math.max(10, 150 - c.country1_rank) : 50,
        [comparison.country2.name]: c.country2_rank ? Math.max(10, 150 - c.country2_rank) : 50,
      }))
    : [];

  return (
    <div className="space-y-6 w-full">
      {/* Header & Country Selectors */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="dash-card p-6 bg-white space-y-6"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] mb-1">
            <GitCompare className="w-4 h-4" /> Country Comparison Matrix
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Bilateral Indicator & Rank Comparison</h1>
          <p className="text-xs text-[#64748B]">
            Compare India side-by-side with global economies across economic, technological, governance, and social metrics.
          </p>
        </div>

        {/* Dual Country Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">First Country</label>
            <select
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-sm rounded-lg p-2.5 font-semibold focus:outline-none focus:border-[#2563EB]"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-blue-200 flex items-center justify-center text-[#2563EB] font-bold text-xs">
              VS
            </div>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">Second Country</label>
            <select
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-sm rounded-lg p-2.5 font-semibold focus:outline-none focus:border-[#2563EB]"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {sameCountrySelected ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div className="text-xs font-medium">
            You have selected <span className="font-semibold">{country1}</span> for both sides. Please pick a different country in the second dropdown to compare.
          </div>
        </div>
      ) : loading || !comparison ? (
        <div className="py-12 text-center text-xs text-[#64748B] dash-card">Loading bilateral data...</div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dash-card p-6 border-l-4 border-l-[#2563EB] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{comparison.country1.flag_emoji}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-blue-200">
                  {comparison.country1.region}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">{comparison.country1.name}</h2>
              <p className="text-xs text-[#64748B] font-medium">
                GDP: {comparison.country1.gdp_usd} • Population: {(comparison.country1.population ? comparison.country1.population / 1e6 : 0).toFixed(1)}M
              </p>
            </div>

            <div className="dash-card p-6 border-l-4 border-l-purple-600 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{comparison.country2.flag_emoji}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  {comparison.country2.region}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">{comparison.country2.name}</h2>
              <p className="text-xs text-[#64748B] font-medium">
                GDP: {comparison.country2.gdp_usd} • Population: {(comparison.country2.population ? comparison.country2.population / 1e6 : 0).toFixed(1)}M
              </p>
            </div>
          </div>

          {/* Visual Charts: Bar & Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title={`Global Rank Comparison (# Lower is Better)`}
              subtitle={`Side-by-side indicator rankings between ${comparison.country1.name} and ${comparison.country2.name}`}
              type="bar"
              data={comparisonBarData}
              dataKeys={[
                { key: comparison.country1.name, name: comparison.country1.name, color: '#2563EB' },
                { key: comparison.country2.name, name: comparison.country2.name, color: '#8B5CF6' },
              ]}
              height={320}
            />

            <ChartCard
              title={`Dimension Strength Overview`}
              subtitle={`Relative performance score overview across key dimensions`}
              type="radar"
              data={comparisonRadarData}
              dataKeys={[
                { key: comparison.country1.name, name: comparison.country1.name, color: '#2563EB' },
                { key: comparison.country2.name, name: comparison.country2.name, color: '#8B5CF6' },
              ]}
              height={320}
            />
          </div>

          {/* Comparison Table with Green Highlight for Better Performer */}
          <div className="dash-card overflow-hidden">
            <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#2563EB]" />
                Detailed Bilateral Comparison Matrix
              </h3>
              <span className="text-xs text-[#64748B] font-medium">Highlighted in Green: Better Global Rank</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#0F172A] uppercase tracking-wider font-semibold border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3 pl-4">Category & Indicator</th>
                    <th className="p-3 text-center">{comparison.country1.flag_emoji} {comparison.country1.name}</th>
                    <th className="p-3 text-center">{comparison.country2.flag_emoji} {comparison.country2.name}</th>
                    <th className="p-3 text-right pr-4">Source Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A] font-medium">
                  {comparison.comparisons.map((c, idx) => {
                    const r1 = c.country1_rank;
                    const r2 = c.country2_rank;
                    const c1IsBetter = r1 !== null && r1 !== undefined && (r2 === null || r2 === undefined || r1 <= r2);
                    const c2IsBetter = r2 !== null && r2 !== undefined && (r1 === null || r1 === undefined || r2 < r1);

                    return (
                      <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="p-3 pl-4">
                          <div className="font-semibold text-[#0F172A]">{c.indicator_name}</div>
                          <div className="text-[11px] text-[#64748B]">{c.category_name}</div>
                        </td>
                        <td className={`p-3 text-center ${c1IsBetter ? 'bg-[#ECFDF5] text-[#10B981]' : ''}`}>
                          <div className={`font-bold text-sm ${c1IsBetter ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>
                            {r1 ? `#${r1}` : '—'}
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            {c.country1_value !== null ? `${c.country1_value} ${c.unit || ''}` : ''}
                          </div>
                        </td>
                        <td className={`p-3 text-center ${c2IsBetter ? 'bg-[#ECFDF5] text-[#10B981]' : ''}`}>
                          <div className={`font-bold text-sm ${c2IsBetter ? 'text-[#10B981]' : 'text-purple-600'}`}>
                            {r2 ? `#${r2}` : '—'}
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            {c.country2_value !== null ? `${c.country2_value} ${c.unit || ''}` : ''}
                          </div>
                        </td>
                        <td className="p-3 text-right pr-4 text-[#64748B]">
                          <a
                            href={c.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#2563EB] inline-flex items-center gap-1 underline font-medium"
                          >
                            {c.source_name} <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
