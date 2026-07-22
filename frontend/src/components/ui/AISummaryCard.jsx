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
    <div className="glass-panel p-5 lg:p-6 rounded-2xl border-l-4 border-l-sky-700 bg-white shadow-xs border border-slate-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center border border-sky-300">
            <Sparkles className="w-4 h-4 text-sky-700 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-950">{title}</h3>
            <p className="text-xs text-slate-700 font-bold">Verified International Data Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Verified Facts
          </span>

          {data && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 text-slate-950 hover:bg-slate-200 transition-all text-xs font-bold flex items-center gap-1"
              title="Copy Summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-1.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-950 hover:bg-slate-200 transition-all disabled:opacity-50"
              title="Refresh AI Summary"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-6 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-sky-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-900 font-bold">Generating AI Summary...</p>
        </div>
      ) : data ? (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-950 font-bold bg-sky-50 p-4 rounded-xl border border-sky-200">
            "{data.summary}"
          </p>

          {/* Grounding Key Metrics */}
          {data.key_metrics && data.key_metrics.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                Key Global Metrics ({data.country})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {data.key_metrics.slice(0, 6).map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-100 border border-slate-300 text-xs font-bold text-slate-950">
                    <div className="font-black text-slate-950 line-clamp-1">{m.indicator}</div>
                    <div className="flex items-center justify-between text-slate-800 mt-0.5">
                      <span className="text-sky-800 font-black">
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
        <div className="py-4 text-center text-xs text-slate-900 font-bold">
          Select a country to generate an executive AI summary.
        </div>
      )}
    </div>
  );
};
