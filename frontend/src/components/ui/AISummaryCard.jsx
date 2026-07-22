import React, { useState } from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Cpu, Copy, Check } from 'lucide-react';

export const AISummaryCard = ({
  data,
  loading = false,
  onRefresh,
  title = "AI Executive Summary",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (data?.summary) {
      navigator.clipboard.writeText(data.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-panel p-6 lg:p-7 rounded-3xl border-l-8 border-l-sky-700 relative overflow-hidden bg-white shadow-sm border-2 border-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center border-2 border-sky-300 shadow-2xs">
            <Sparkles className="w-5 h-5 text-sky-700 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-950">{title}</h3>
            <p className="text-xs text-slate-900 flex items-center gap-1.5 font-extrabold mt-0.5">
              <Cpu className="w-4 h-4 text-sky-700" />
              <span>LangChain + Ollama Llama 3.1 8B (National UX4G Standard)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[11px] px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-400 font-black">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Grounded DB Retrieval (Zero Hallucination)
          </span>

          {data && (
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-slate-200 border border-slate-400 text-slate-950 hover:bg-slate-300 transition-all text-xs font-black flex items-center gap-1"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-200 border border-slate-400 text-slate-950 hover:bg-slate-300 transition-all disabled:opacity-50"
              title="Regenerate AI Summary"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-7 h-7 border-3 border-sky-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-900 font-extrabold">Synthesizing verified global facts using LangChain pipeline...</p>
        </div>
      ) : data ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-950 font-bold bg-sky-50 p-4 lg:p-5 rounded-2xl border-2 border-sky-200 shadow-2xs">
            "{data.summary}"
          </p>

          {/* Grounded Key Metrics */}
          {data.key_metrics && data.key_metrics.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Grounding Facts & Key Indicators ({data.country})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {data.key_metrics.slice(0, 6).map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100 border-2 border-slate-300 text-xs font-extrabold text-slate-950 shadow-2xs">
                    <div className="font-black text-slate-950 line-clamp-1">{m.indicator}</div>
                    <div className="flex items-center justify-between text-slate-800 mt-1 font-bold">
                      <span className="text-sky-800 font-black">
                        {m.rank ? `#${m.rank}` : 'Value:'}
                      </span>
                      <span className="font-mono text-slate-950">{m.value} {m.unit || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-slate-900 font-extrabold">
          Select a country to generate an instant AI-powered executive summary.
        </div>
      )}
    </div>
  );
};
