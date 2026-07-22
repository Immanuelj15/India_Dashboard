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
    <div className="glass-panel p-6 lg:p-7 rounded-3xl border-l-4 border-l-sky-600 relative overflow-hidden bg-white shadow-sm border border-slate-200/90">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center border border-sky-200 shadow-2xs">
            <Sparkles className="w-5 h-5 text-sky-600 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mt-0.5">
              <Cpu className="w-3.5 h-3.5 text-sky-600" />
              <span>LangChain + Ollama Llama 3.1 8B (UX4G Standard)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[11px] px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Grounded DB Retrieval (Zero Hallucination)
          </span>

          {data && (
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all text-xs font-semibold flex items-center gap-1"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all disabled:opacity-50"
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
          <div className="w-7 h-7 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-semibold">Synthesizing verified global facts using LangChain pipeline...</p>
        </div>
      ) : data ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-800 font-medium bg-sky-50/70 p-4 lg:p-5 rounded-2xl border border-sky-100 shadow-2xs">
            "{data.summary}"
          </p>

          {/* Grounded Key Metrics */}
          {data.key_metrics && data.key_metrics.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Grounding Facts & Key Indicators ({data.country})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {data.key_metrics.slice(0, 6).map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs shadow-2xs">
                    <div className="font-bold text-slate-800 line-clamp-1">{m.indicator}</div>
                    <div className="flex items-center justify-between text-slate-500 mt-1 font-semibold">
                      <span className="text-sky-700 font-extrabold">
                        {m.rank ? `#${m.rank}` : 'Value:'}
                      </span>
                      <span className="font-mono">{m.value} {m.unit || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-slate-500 font-medium">
          Select a country to generate an instant AI-powered executive summary.
        </div>
      )}
    </div>
  );
};
