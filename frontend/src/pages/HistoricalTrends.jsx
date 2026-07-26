import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchIndicators, fetchTrend } from '../api/client';
import { ChartCard } from '../components/ui/ChartCard';
import { SourceBadge } from '../components/ui/SourceBadge';
import { TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="space-y-6 w-full">
      {/* Header & Selectors */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="dash-card p-6 bg-white space-y-6"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] mb-1">
            <TrendingUp className="w-4 h-4" /> Multi-Year Historical Analysis
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Historical Ranking Trajectory & Trends</h1>
          <p className="text-xs text-[#64748B]">
            Track multi-year progress and historical position across available international indices (2020 – 2025).
          </p>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-sm rounded-lg p-2.5 font-semibold focus:outline-none focus:border-[#2563EB]"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag_emoji} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">Global Indicator</label>
            <select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-sm rounded-lg p-2.5 font-semibold focus:outline-none focus:border-[#2563EB]"
            >
              {indicators.map((ind) => (
                <option key={ind.slug} value={ind.slug}>
                  {ind.name} ({ind.category?.name || 'Category'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {loading || !trendData ? (
        <div className="py-12 text-center text-xs text-[#64748B] dash-card">Loading trend trajectory...</div>
      ) : (
        <div className="space-y-6">
          {/* Trend Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="dash-card p-5 border-l-4 border-l-[#2563EB]">
              <div className="text-xs font-semibold text-[#64748B] uppercase">Indicator</div>
              <div className="text-sm font-bold text-[#0F172A] mt-1 line-clamp-1">{trendData.indicator.name}</div>
              <div className="text-xs text-[#2563EB] font-medium mt-0.5">{trendData.indicator.category?.name}</div>
            </div>

            <div className="dash-card p-5 border-l-4 border-l-amber-500">
              <div className="text-xs font-semibold text-[#64748B] uppercase">Latest Global Position</div>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">
                {lastPoint?.rank ? `#${lastPoint.rank}` : 'N/A'}
              </div>
              <div className="text-xs text-[#64748B] font-medium">Year {lastPoint?.year} Value: {lastPoint?.value} {trendData.indicator.unit}</div>
            </div>

            <div className="dash-card p-5 border-l-4 border-l-[#10B981]">
              <div className="text-xs font-semibold text-[#64748B] uppercase">5-Year Trajectory Shift</div>
              <div className="text-2xl font-extrabold text-[#10B981] mt-1">
                {rankDelta > 0 ? `+${rankDelta} Ranks` : rankDelta < 0 ? `${rankDelta} Ranks` : 'Stable'}
              </div>
              <div className="text-xs text-[#64748B] font-medium">From Year {firstPoint?.year} (#{firstPoint?.rank})</div>
            </div>
          </div>

          {/* Recharts Line Chart */}
          <ChartCard
            title={`${trendData.indicator.name} Historical Trend (${trendData.country.name})`}
            subtitle="Multi-year trajectory line chart (# lower indicates higher global rank)"
            type="line"
            data={lineChartData}
            dataKeys={[{ key: 'Rank', name: 'Global Rank (#)', color: '#2563EB' }]}
            height={340}
          />

          {/* Points Table */}
          <div className="dash-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2563EB]" /> Yearly Data Points & Provenance
              </h3>
              <SourceBadge
                sourceName={trendData.source?.name}
                sourceUrl={trendData.source?.url}
                lastUpdated={`${lastPoint?.year}`}
              />
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#0F172A] uppercase tracking-wider font-semibold border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3 pl-4">Year</th>
                    <th className="p-3">Rank Position</th>
                    <th className="p-3">Metric Value</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3 text-right pr-4">Data Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A] font-medium">
                  {trendData.points.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="p-3 pl-4 font-semibold text-[#0F172A]">{pt.year}</td>
                      <td className="p-3 font-bold text-[#2563EB]">#{pt.rank || 'N/A'}</td>
                      <td className="p-3 font-semibold">{pt.value}</td>
                      <td className="p-3 text-[#64748B]">{trendData.indicator.unit || 'Score'}</td>
                      <td className="p-3 text-right pr-4 text-[#64748B] font-medium">{trendData.source?.name || 'Trusted Source'}</td>
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
