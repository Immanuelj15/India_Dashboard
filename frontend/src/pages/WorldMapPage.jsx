import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../api/client';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { Map } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="dash-card p-6 bg-white space-y-2"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
          <Map className="w-4 h-4" /> Interactive Geospatial Map
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">World Map & Country Telemetry</h1>
        <p className="text-xs text-[#64748B]">
          Click any country marker on the interactive map to inspect its global rankings, key indicators, and executive summaries.
        </p>
      </motion.div>

      {loading ? (
        <div className="h-[520px] dash-card flex items-center justify-center text-xs font-medium text-[#64748B]">
          Loading map coordinates...
        </div>
      ) : (
        <InteractiveMap countries={countries} />
      )}
    </div>
  );
};
