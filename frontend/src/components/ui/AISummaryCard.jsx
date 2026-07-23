import React, { useState } from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Copy, Check } from 'lucide-react';

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
    <div className="glass-panel p-5 lg:p-6 rounded-3xl border-l-8 border-l-sky-700 bg-white shadow-premium border border-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-100 to-sky-200 flex items-center justify-center border border-sky-300 shadow-2xs">
            <Sparkles className="w-5 h-5 text-sky-700 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base lg:text-lg font-black text-slate-950 tracking-tight">{title}</h3>
            <p className="text-xs text-slate-700 font-bold">Verified International Data Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-950 border border-emerald-400 font-black shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Verified Facts
          </span>

          {data && (
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-950 transition-all text-xs font-black flex items-center gap-1.5 shadow-2xs"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4 text-slate-700" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-950 transition-all disabled:opacity-50 shadow-2xs"
              title="Refresh AI Summary"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-6 text-center space-y-2">
          <div className="w-7 h-7 border-3 border-sky-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-900 font-black">Synthesizing database facts...</p>
        </div>
      ) : data ? (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-950 font-extrabold bg-gradient-to-r from-sky-50/90 via-white to-amber-50/60 p-4 lg:p-5 rounded-2xl border border-sky-200 shadow-inner">
            "{data.summary}"
          </p>

          {/* Grounding Key Metrics */}
          {data.key_metrics && data.key_metrics.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                Key Global Metrics ({data.country})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {data.key_metrics.slice(0, 6).map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100/90 border border-slate-300 text-xs font-bold text-slate-950 shadow-2xs">
                    <div className="font-black text-slate-950 line-clamp-1">{m.indicator}</div>
                    <div className="flex items-center justify-between text-slate-800 mt-1 font-bold">
                      <span className="text-sky-800 font-black text-sm">
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
        <div className="py-4 text-center text-xs text-slate-900 font-bold">
          Select a country to generate an executive AI summary.
        </div>
      )}
    </div>
  );
};
