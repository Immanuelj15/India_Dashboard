import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../api/client';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { MapPin } from 'lucide-react';

export const WorldMapPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries()
      .then((res) => {
        setCountries(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading countries for map:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="glass-panel p-6 rounded-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <MapPin className="w-4 h-4" /> Global Geospatial Explorer
        </div>
        <h1 className="text-2xl font-extrabold text-white">Interactive World Map & Country Intelligence</h1>
        <p className="text-xs text-gray-400">
          Click any country marker on the interactive globe to inspect its global rankings, key metrics, and AI-synthesized summary.
        </p>
      </div>

      {loading ? (
        <div className="h-[520px] glass-panel rounded-2xl animate-pulse flex items-center justify-center text-sm text-gray-400">
          Loading geospatial map nodes...
        </div>
      ) : (
        <InteractiveMap countries={countries} />
      )}
    </div>
  );
};
