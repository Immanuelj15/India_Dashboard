import React from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Cpu } from 'lucide-react';

export const AISummaryCard = ({
  data,
  loading = false,
  onRefresh,
  title = "AI Executive Summary",
}) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-sky-600 relative overflow-hidden bg-white shadow-sm border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center border border-sky-200">
            <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <Cpu className="w-3 h-3 text-sky-600" />
              <span>LangChain + Ollama Llama 3.1 8B (UX4G Standard)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Factual Grounding (No Hallucination)
          </span>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all disabled:opacity-50"
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
          <div className="w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-medium">Synthesizing global indicators using LangChain pipeline...</p>
        </div>
      ) : data ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-800 font-medium bg-sky-50/60 p-4 rounded-xl border border-sky-100">
            "{data.summary}"
          </p>

          {/* Grounded Key Metrics */}
          {data.key_metrics && data.key_metrics.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Grounding Facts & Key Indicators ({data.country})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {data.key_metrics.slice(0, 6).map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div className="font-semibold text-slate-800 line-clamp-1">{m.indicator}</div>
                    <div className="flex items-center justify-between text-slate-500 mt-1 font-medium">
                      <span className="text-sky-700 font-bold">
                        {m.rank ? `#${m.rank}` : 'Value:'}
                      </span>
                      <span>{m.value} {m.unit || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-slate-500">
          Select a country to generate an instant AI-powered executive summary.
        </div>
      )}
    </div>
  );
};
