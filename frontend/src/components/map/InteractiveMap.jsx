import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { fetchCountryRankings, fetchAISummary } from '../../api/client';
import { Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const createCustomIcon = (flag = '🌐') => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background: #ffffff;
        border: 2px solid #2563EB;
        border-radius: 50%;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 4px 10px rgba(37,99,235,0.2);
        cursor: pointer;
      ">
        ${flag}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
};

export const InteractiveMap = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCountryClick = async (country) => {
    setSelectedCountry(country);
    setLoading(true);
    setAiSummary('');
    setRankings([]);

    try {
      const [rankRes, aiRes] = await Promise.all([
        fetchCountryRankings(country.code),
        fetchAISummary(country.name),
      ]);
      setRankings(rankRes);
      setAiSummary(aiRes.summary);
    } catch (err) {
      console.error('Error fetching popup details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="w-full h-[520px] rounded-xl overflow-hidden dash-card relative z-10">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={3}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {countries.map((country) => {
            if (!country.latitude || !country.longitude) return null;
            return (
              <Marker
                key={country.code}
                position={[country.latitude, country.longitude]}
                icon={createCustomIcon(country.flag_emoji)}
                eventHandlers={{
                  click: () => handleCountryClick(country),
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-1 min-w-[240px] space-y-2 text-[#0F172A]">
                    <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                      <span className="text-xl">{country.flag_emoji}</span>
                      <div>
                        <h4 className="font-bold text-xs text-[#0F172A]">{country.name}</h4>
                        <span className="text-[10px] text-[#64748B]">{country.region} • Pop: {(country.population ? country.population / 1e6 : 0).toFixed(1)}M</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCountryClick(country)}
                      className="w-full text-center py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors mt-2 shadow-xs"
                    >
                      Inspect Country Data
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Selected Country Details Panel */}
      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="dash-card p-6 border-l-4 border-l-[#2563EB] space-y-4"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCountry.flag_emoji}</span>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                  {selectedCountry.name}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] border border-blue-200">
                    {selectedCountry.code}
                  </span>
                </h3>
                <p className="text-xs text-[#64748B] font-medium">
                  GDP: {selectedCountry.gdp_usd} • Region: {selectedCountry.region}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0] transition-colors"
            >
              Close
            </button>
          </div>

          {loading ? (
            <div className="py-6 text-center text-xs text-[#64748B]">Fetching telemetry for {selectedCountry.name}...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Summary Box */}
              <div className="lg:col-span-1 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB]">
                  <Sparkles className="w-4 h-4" /> AI Executive Summary
                </div>
                <p className="text-xs text-[#0F172A] leading-relaxed font-normal">
                  {aiSummary || 'Summary generating...'}
                </p>
              </div>

              {/* Indicator Rankings Table */}
              <div className="lg:col-span-2 space-y-2">
                <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  Top Global Rankings ({rankings.length} Indicators)
                </div>

                <div className="max-h-60 overflow-y-auto pr-1 space-y-1.5">
                  {rankings.slice(0, 10).map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#0F172A]">{r.indicator.name}</div>
                        <div className="text-[11px] text-[#64748B]">{r.indicator.category?.name} • {r.source?.name}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[#2563EB]">
                          {r.rank ? `#${r.rank}` : 'N/A'}
                        </span>
                        <div className="text-[11px] text-[#64748B]">{r.value} {r.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
