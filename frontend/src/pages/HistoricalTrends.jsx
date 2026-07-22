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
      <div className="glass-panel p-6 rounded-3xl space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-accent-violet uppercase tracking-wider mb-1">
            <LineChart className="w-4 h-4" /> Multi-Year Ranking Analysis
          </div>
          <h1 className="text-2xl font-extrabold text-white">Historical Ranking & Trajectory Trends</h1>
          <p className="text-xs text-gray-400">
            Track multi-year progress and historical position across available international indices (2020 – 2025).
          </p>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Select Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-surface-card border border-surface-border text-white text-sm rounded-xl p-3 focus:outline-none focus:border-primary-500"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Select Indicator</label>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="w-full bg-surface-card border border-surface-border text-white text-sm rounded-xl p-3 focus:outline-none focus:border-primary-500"
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
        <div className="py-12 text-center text-sm text-gray-400">Loading trend points...</div>
      ) : (
        <div className="space-y-8">
          {/* Trend Summary Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-primary-500">
              <div className="text-xs font-semibold text-gray-400 uppercase">Target Indicator</div>
              <div className="text-base font-bold text-white mt-1">{trendData.indicator.name}</div>
              <div className="text-xs text-primary-400 font-medium mt-0.5">{trendData.indicator.category?.name}</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-accent-saffron">
              <div className="text-xs font-semibold text-gray-400 uppercase">Latest Global Position</div>
              <div className="text-2xl font-extrabold text-accent-saffron mt-1">
                {lastPoint?.rank ? `#${lastPoint.rank}` : 'N/A'}
              </div>
              <div className="text-xs text-gray-400">Year {lastPoint?.year} Metric: {lastPoint?.value} {trendData.indicator.unit}</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500">
              <div className="text-xs font-semibold text-gray-400 uppercase">5-Year Trajectory Shift</div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                {rankDelta > 0 ? `+${rankDelta} Ranks Improvement` : rankDelta < 0 ? `${rankDelta} Ranks` : 'Stable Position'}
              </div>
              <div className="text-xs text-gray-400">From Year {firstPoint?.year} (#{firstPoint?.rank})</div>
            </div>
          </div>

          {/* Recharts Line Chart */}
          <ChartCard
            title={`${trendData.indicator.name} Historical Trend (${trendData.country.name})`}
            subtitle="Multi-year trajectory line chart (# lower indicates higher global rank)"
            type="line"
            data={lineChartData}
            dataKeys={[{ key: 'Rank', name: 'Global Rank (#)', color: '#3b82f6' }]}
            height={360}
          />

          {/* Detailed Points Table & Source Attribution */}
          <div className="glass-panel p-6 rounded-2xl border border-surface-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-cyan" /> Yearly Data Table & Provenance
              </h3>
              <SourceBadge
                sourceName={trendData.source?.name}
                sourceUrl={trendData.source?.url}
                lastUpdated={`${lastPoint?.year}`}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-card text-gray-400 uppercase tracking-wider font-semibold border-b border-surface-border">
                  <tr>
                    <th className="p-3">Year</th>
                    <th className="p-3">Rank Position</th>
                    <th className="p-3">Raw Metric Value</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3 text-right">Data Provider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50 text-gray-200">
                  {trendData.points.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-surface-card/50 transition-colors">
                      <td className="p-3 font-bold text-white">{pt.year}</td>
                      <td className="p-3 font-extrabold text-accent-saffron">#{pt.rank || 'N/A'}</td>
                      <td className="p-3 font-medium">{pt.value}</td>
                      <td className="p-3 text-gray-400">{trendData.indicator.unit || 'Score'}</td>
                      <td className="p-3 text-right text-gray-400">{trendData.source?.name || 'Trusted Source'}</td>
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
