import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchAll } from '../api/client';
import { Search, Globe, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const data = await searchAll(searchTerm.trim());
      setResults(data);
    } catch (err) {
      console.error('Error executing search:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
    performSearch(query);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="dash-card p-6 bg-white space-y-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] mb-1">
            <Search className="w-4 h-4" /> Global Intelligence Lookup
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Search Indicators, Countries & Categories</h1>
          <p className="text-xs text-[#64748B]">
            Query across 84 global indices, trusted international organizations, and benchmark metrics.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="text"
            placeholder="Type country (e.g., India, Japan), indicator (e.g., GDP, Innovation), or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] rounded-lg pl-10 pr-24 py-2.5 font-medium focus:outline-none focus:border-[#2563EB]"
          />
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Search
          </button>
        </form>
      </motion.div>

      {/* Results */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#64748B] dash-card">Searching dataset index...</div>
      ) : results ? (
        <div className="space-y-6">
          {/* Countries Results */}
          {results.countries.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2563EB]" /> Matching Countries ({results.countries.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {results.countries.map((c) => (
                  <Link
                    key={c.code}
                    to={`/map`}
                    className="dash-card dash-card-hover p-4 flex items-center gap-3"
                  >
                    <span className="text-2xl">{c.flag_emoji}</span>
                    <div>
                      <div className="font-bold text-[#0F172A] text-xs">{c.name}</div>
                      <div className="text-[11px] text-[#64748B]">{c.region} • {c.code}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Indicators Results */}
          {results.indicators.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Matching Indicators ({results.indicators.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.indicators.map((ind) => (
                  <div key={ind.slug} className="dash-card p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#0F172A] text-xs">{ind.name}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] font-semibold border border-blue-200">
                        {ind.category?.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] line-clamp-2">{ind.description}</p>
                    <div className="text-[11px] text-[#64748B] pt-1">Unit: {ind.unit || 'Score'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rankings Results Table */}
          {results.rankings.length > 0 && (
            <div className="dash-card p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#0F172A]">Matching Global Indicator Records ({results.rankings.length})</h2>
              <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] text-[#0F172A] uppercase tracking-wider font-semibold border-b border-[#E2E8F0]">
                    <tr>
                      <th className="p-3 pl-4">Country</th>
                      <th className="p-3">Indicator</th>
                      <th className="p-3">Category</th>
                      <th className="p-3 text-center">Rank</th>
                      <th className="p-3">Value</th>
                      <th className="p-3 text-right pr-4">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A] font-medium">
                    {results.rankings.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="p-3 pl-4 font-semibold text-[#0F172A] flex items-center gap-1.5">
                          <span>{r.country.flag_emoji}</span>
                          <span>{r.country.name}</span>
                        </td>
                        <td className="p-3 font-semibold">{r.indicator.name}</td>
                        <td className="p-3 text-[#64748B]">{r.indicator.category?.name}</td>
                        <td className="p-3 text-center font-bold text-[#2563EB]">#{r.rank || 'N/A'}</td>
                        <td className="p-3 font-semibold">{r.value} {r.unit}</td>
                        <td className="p-3 text-right pr-4 text-[#64748B]">{r.source?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {results.countries.length === 0 && results.indicators.length === 0 && results.rankings.length === 0 && (
            <div className="py-12 text-center text-xs text-[#64748B] dash-card">
              No matching records found for "{query}". Try searching for terms like "GDP", "Innovation", "India", or "AI".
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-[#64748B] dash-card">
          Enter a keyword above to search global indices.
        </div>
      )}
    </div>
  );
};
