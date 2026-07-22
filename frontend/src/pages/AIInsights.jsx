import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchAISummary } from '../api/client';
import { AISummaryCard } from '../components/ui/AISummaryCard';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AIInsights = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [summaryData, setSummaryData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries().then(setCountries).catch(console.error);
  }, []);

  const loadSummary = async () => {
    if (!selectedCountry) return;
    setLoading(true);
    try {
      const res = await fetchAISummary(selectedCountry);
      setSummaryData(res);
    } catch (err) {
      console.error('Error fetching AI summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, [selectedCountry]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl space-y-4 bg-gradient-to-r from-surface-card via-surface to-background">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent-violet/20 border border-accent-violet/30">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-accent-violet">
            LangChain + Ollama Llama 3.1 8B Integration
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AI-Powered Country Executive Summaries
        </h1>

        <p className="text-xs text-gray-300 leading-relaxed max-w-3xl font-normal">
          Generates concise, factual summaries for any country directly derived from verified database facts across Economy, Governance, Innovation, Healthcare, and Education. Strict zero-hallucination configuration.
        </p>

        {/* Target Country Selector */}
        <div className="pt-2 max-w-md space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Select Country to Summarize</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-surface-card border border-surface-border text-white text-sm rounded-xl p-3 focus:outline-none focus:border-accent-violet"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.name}>
                {c.flag_emoji} {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* AI Summary Card */}
      <AISummaryCard
        data={summaryData}
        loading={loading}
        onRefresh={loadSummary}
        title={`${selectedCountry} Global Standing — AI Summary`}
      />

      {/* Technical Architecture Info Box */}
      <div className="glass-panel p-6 rounded-2xl border border-surface-border space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Grounded RAG Architecture Guarantee
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-surface border border-surface-border space-y-1">
            <div className="font-bold text-gray-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan" /> 1. Fact Extraction
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Retrieves exact 2024 ranking data points directly from PostgreSQL / SQLite schema.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface border border-surface-border space-y-1">
            <div className="font-bold text-gray-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-violet" /> 2. LangChain Pipeline
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Formats retrieved facts into a deterministic prompt template enforcing zero hallucination.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface border border-surface-border space-y-1">
            <div className="font-bold text-gray-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3. Ollama Llama 3.1 8B
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Runs local LLM synthesis with automatic DB fallback if local server is unreachable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
