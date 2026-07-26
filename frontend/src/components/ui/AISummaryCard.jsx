import React, { useState } from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';

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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.3 }}
      className="dash-card p-7 border-l-4 border-l-[#2563EB] bg-white"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-blue-200 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A] tracking-tight">{title}</h3>
            <p className="text-sm text-[#64748B] font-medium">Grounded Local LLM & Groq Cloud Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#10B981] border border-emerald-200">
            <ShieldCheck className="w-4 h-4" /> 100% Grounded
          </span>

          {data && (
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-[#0F172A] transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Copy Summary"
            >
              {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4 text-[#64748B]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-[#0F172A] transition-colors disabled:opacity-50"
              title="Refresh AI Summary"
            >
              <RefreshCw className={`w-4.5 h-4.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="py-8 text-center space-y-2.5">
          <div className="w-7 h-7 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-[#64748B] font-semibold">Synthesizing indicator data with Groq Llama 3.3 70B...</p>
        </div>
      ) : data ? (
        <div className="space-y-5">
          <div className="text-base sm:text-lg leading-relaxed text-[#0F172A] font-semibold bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] italic">
            "<TypewriterText text={data.summary} speed={15} />"
          </div>

          {/* Key Metrics */}
          {data.key_metrics && data.key_metrics.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Key Indicators ({data.country})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {data.key_metrics.slice(0, 6).map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm"
                  >
                    <div className="font-bold text-[#0F172A] line-clamp-1">{m.indicator}</div>
                    <div className="flex items-center justify-between text-[#64748B] mt-1.5 font-medium">
                      <span className="text-[#2563EB] font-extrabold text-base">
                        {m.rank ? `#${m.rank}` : 'Value:'}
                      </span>
                      <span className="font-mono font-semibold text-[#0F172A]">{m.value} {m.unit || ''}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center text-sm text-[#64748B]">
          Select a country to generate an executive AI summary.
        </div>
      )}
    </motion.div>
  );
};
