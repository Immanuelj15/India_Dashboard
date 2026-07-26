import React, { useEffect, useState } from 'react';
import { fetchCountries, fetchAISummary } from '../api/client';
import { AISummaryCard } from '../components/ui/AISummaryCard';
import { Sparkles, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="space-y-6 w-full">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="dash-card p-6 bg-white space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
          <Sparkles className="w-4 h-4" /> AI Grounded Synthesis Engine (Groq Llama 3.3 70B Enabled)
        </div>

        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          AI-Powered Country Executive Summaries
        </h1>

        <p className="text-xs text-[#64748B] leading-relaxed max-w-3xl font-medium">
          Generates concise, factual summaries for any country directly derived from verified database records across Economy, Governance, Innovation, Healthcare, and Education using ultra-fast Groq LPU inference.
        </p>

        {/* Target Country Selector */}
        <div className="pt-1 max-w-md space-y-1.5">
          <label className="text-xs font-semibold text-[#0F172A]">Select Country to Summarize</label>
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
      </motion.div>

      {/* AI Summary Card */}
      <AISummaryCard
        data={summaryData}
        loading={loading}
        onRefresh={loadSummary}
        title={`${selectedCountry} Global Standing — AI Summary`}
      />

      {/* RAG Architecture Info Box */}
      <div className="dash-card p-6 space-y-4 bg-white">
        <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2563EB]" /> Grounded RAG Architecture Guarantee
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> 1. Fact Extraction
            </div>
            <p className="text-[#64748B] text-[11px] leading-relaxed font-medium">
              Retrieves exact indicator data points directly from SQLite database schema.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> 2. RAG Pipeline
            </div>
            <p className="text-[#64748B] text-[11px] leading-relaxed font-medium">
              Formats retrieved facts into a deterministic prompt template enforcing zero hallucination.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#10B981]" /> 3. Groq LPU Inference
            </div>
            <p className="text-[#64748B] text-[11px] leading-relaxed font-medium">
              Runs Llama 3.3 70B via Groq API with local Ollama fallback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
