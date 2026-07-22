import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchAll } from '../api/client';
import { Search, Globe, Trophy } from 'lucide-react';

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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl space-y-6 bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
            <Search className="w-4 h-4" /> Global Intelligence Lookup
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Search Indicators, Countries & Categories</h1>
          <p className="text-xs text-slate-500 font-medium">
            Query across 70+ global indices, trusted international organizations, and benchmark metrics.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="text"
            placeholder="Type country name (e.g. India, Japan), indicator (e.g. GDP, AI, Innovation), or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-2xl pl-12 pr-28 py-3.5 focus:outline-none focus:border-sky-600 focus:bg-white font-medium shadow-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors shadow-md shadow-sky-600/20"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Rendering */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500 font-medium">Searching global dataset index...</div>
      ) : results ? (
        <div className="space-y-8">
          {/* Countries Results */}
          {results.countries.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" /> Matching Countries ({results.countries.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {results.countries.map((c) => (
                  <Link
                    key={c.code}
                    to={`/map`}
                    className="glass-panel p-4 rounded-xl hover:border-sky-500 flex items-center gap-3 transition-all bg-white shadow-sm"
                  >
                    <span className="text-2xl">{c.flag_emoji}</span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{c.region} • {c.code}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Indicators Results */}
          {results.indicators.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-600" /> Matching Indicators ({results.indicators.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.indicators.map((ind) => (
                  <div key={ind.slug} className="glass-panel p-4 rounded-xl border border-slate-200 bg-white space-y-1 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-sm">{ind.name}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-bold border border-sky-200">
                        {ind.category?.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{ind.description}</p>
                    <div className="text-[11px] text-slate-400 font-semibold pt-1">Unit: {ind.unit || 'Score'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rankings Results Table */}
          {results.rankings.length > 0 && (
            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 bg-white space-y-3 p-5 shadow-sm">
              <h2 className="text-base font-bold text-slate-900">Matching Global Indicator Records ({results.rankings.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Country</th>
                      <th className="p-3">Indicator</th>
                      <th className="p-3">Category</th>
                      <th className="p-3 text-center">Rank</th>
                      <th className="p-3">Value</th>
                      <th className="p-3 text-right">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {results.rankings.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>{r.country.flag_emoji}</span>
                          <span>{r.country.name}</span>
                        </td>
                        <td className="p-3 font-medium">{r.indicator.name}</td>
                        <td className="p-3 text-slate-500 font-medium">{r.indicator.category?.name}</td>
                        <td className="p-3 text-center font-extrabold text-sky-700">#{r.rank || 'N/A'}</td>
                        <td className="p-3 font-semibold">{r.value} {r.unit}</td>
                        <td className="p-3 text-right text-slate-500 font-medium">{r.source?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {results.countries.length === 0 && results.indicators.length === 0 && results.rankings.length === 0 && (
            <div className="py-12 text-center text-xs text-slate-500 font-medium glass-panel rounded-2xl bg-white">
              No matching records found for "{query}". Try searching for terms like "GDP", "Innovation", "India", or "AI".
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-slate-500 font-medium glass-panel rounded-2xl bg-white">
          Enter a keyword above to search global indices.
        </div>
      )}
    </div>
  );
};
