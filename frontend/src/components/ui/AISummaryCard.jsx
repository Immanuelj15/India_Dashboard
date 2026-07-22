import React from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Cpu } from 'lucide-react';

export const AISummaryCard = ({
  data,
  loading = false,
  onRefresh,
  title = "AI Executive Summary",
}) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-accent-violet relative overflow-hidden bg-gradient-to-br from-surface to-surface-card shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent-violet/20 flex items-center justify-center border border-accent-violet/30">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-100">{title}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-accent-cyan" />
              <span>LangChain + Ollama Llama 3.1 8B</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <ShieldCheck className="w-3 h-3" /> Factual Grounding (No Hallucination)
          </span>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-lg bg-surface border border-surface-border text-gray-400 hover:text-white hover:bg-surface-border transition-all disabled:opacity-50"
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
          <div className="w-6 h-6 border-2 border-accent-violet border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-gray-400">Synthesizing global indicators using LangChain pipeline...</p>
        </div>
      ) : data ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-gray-200 font-medium bg-surface-card/60 p-4 rounded-xl border border-surface-border/50">
            "{data.summary}"
          </p>

          {/* Grounded Key Metrics */}
          {data.key_metrics && data.key_metrics.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Grounding Facts & Key Indicators ({data.country})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {data.key_metrics.slice(0, 6).map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-surface border border-surface-border text-xs">
                    <div className="font-semibold text-gray-200 line-clamp-1">{m.indicator}</div>
                    <div className="flex items-center justify-between text-gray-400 mt-1">
                      <span className="text-accent-saffron font-bold">
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
        <div className="py-6 text-center text-xs text-gray-400">
          Select a country to generate an instant AI-powered executive summary.
        </div>
      )}
    </div>
  );
};
