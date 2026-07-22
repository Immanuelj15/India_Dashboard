import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchIndicators, fetchTrend } from '../api/client';
import { ChartCard } from '../components/ui/ChartCard';
import { SourceBadge } from '../components/ui/SourceBadge';
import { LineChart, Calendar } from 'lucide-react';

export const HistoricalTrends = () => {
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedIndicator, setSelectedIndicator] = useState('global-innovation-index');
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCountries(), fetchIndicators()])
      .then(([cRes, iRes]) => {
        setCountries(cRes);
        setIndicators(iRes);
      })
      .catch(console.error);
  }, []);

  const loadTrend = async () => {
    if (!selectedIndicator || !selectedCountry) return;
    setLoading(true);
    try {
      const data = await fetchTrend(selectedIndicator, selectedCountry);
      setTrendData(data);
    } catch (err) {
      console.error('Error fetching trend data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrend();
  }, [selectedCountry, selectedIndicator]);

  const lineChartData = trendData
    ? trendData.points.map((p) => ({
        year: p.year.toString(),
        Rank: p.rank,
        Value: p.value,
      }))
    : [];

  const firstPoint = trendData?.points[0];
  const lastPoint = trendData?.points[trendData.points.length - 1];
  const rankDelta = firstPoint && lastPoint && firstPoint.rank && lastPoint.rank ? firstPoint.rank - lastPoint.rank : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="glass-panel p-6 rounded-3xl space-y-6 bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
            <LineChart className="w-4 h-4" /> Multi-Year Ranking Analysis
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Historical Ranking & Trajectory Trends</h1>
          <p className="text-xs text-slate-500 font-medium">
            Track multi-year progress and historical position across available international indices (2020 – 2025).
          </p>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Select Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 focus:outline-none focus:border-sky-600 focus:bg-white font-medium"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Select Indicator</label>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl p-3 focus:outline-none focus:border-sky-600 focus:bg-white font-medium"
            >
              {indicators.map((ind) => (
                <option key={ind.slug} value={ind.slug}>
                  {ind.name} ({ind.category?.name || 'Category'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading || !trendData ? (
        <div className="py-12 text-center text-sm text-slate-500 font-medium">Loading trend points...</div>
      ) : (
        <div className="space-y-8">
          {/* Trend Summary Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-sky-600 bg-white">
              <div className="text-xs font-bold text-slate-400 uppercase">Target Indicator</div>
              <div className="text-base font-extrabold text-slate-900 mt-1">{trendData.indicator.name}</div>
              <div className="text-xs text-sky-700 font-bold mt-0.5">{trendData.indicator.category?.name}</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500 bg-white">
              <div className="text-xs font-bold text-slate-400 uppercase">Latest Global Position</div>
              <div className="text-2xl font-extrabold text-amber-600 mt-1">
                {lastPoint?.rank ? `#${lastPoint.rank}` : 'N/A'}
              </div>
              <div className="text-xs text-slate-500 font-medium">Year {lastPoint?.year} Metric: {lastPoint?.value} {trendData.indicator.unit}</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-600 bg-white">
              <div className="text-xs font-bold text-slate-400 uppercase">5-Year Trajectory Shift</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">
                {rankDelta > 0 ? `+${rankDelta} Ranks Improvement` : rankDelta < 0 ? `${rankDelta} Ranks` : 'Stable Position'}
              </div>
              <div className="text-xs text-slate-500 font-medium">From Year {firstPoint?.year} (#{firstPoint?.rank})</div>
            </div>
          </div>

          {/* Recharts Line Chart */}
          <ChartCard
            title={`${trendData.indicator.name} Historical Trend (${trendData.country.name})`}
            subtitle="Multi-year trajectory line chart (# lower indicates higher global rank)"
            type="line"
            data={lineChartData}
            dataKeys={[{ key: 'Rank', name: 'Global Rank (#)', color: '#0284c7' }]}
            height={360}
          />

          {/* Detailed Points Table & Source Attribution */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" /> Yearly Data Table & Provenance
              </h3>
              <SourceBadge
                sourceName={trendData.source?.name}
                sourceUrl={trendData.source?.url}
                lastUpdated={`${lastPoint?.year}`}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Year</th>
                    <th className="p-3">Rank Position</th>
                    <th className="p-3">Raw Metric Value</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3 text-right">Data Provider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {trendData.points.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{pt.year}</td>
                      <td className="p-3 font-extrabold text-sky-700">#{pt.rank || 'N/A'}</td>
                      <td className="p-3 font-semibold">{pt.value}</td>
                      <td className="p-3 text-slate-500">{trendData.indicator.unit || 'Score'}</td>
                      <td className="p-3 text-right text-slate-500 font-medium">{trendData.source?.name || 'Trusted Source'}</td>
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
