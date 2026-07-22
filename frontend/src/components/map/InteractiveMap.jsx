import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { fetchCountryRankings, fetchAISummary } from '../../api/client';
import { Trophy } from 'lucide-react';

const createCustomIcon = (flag = '🌐') => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background: #111827;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
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
      <div className="w-full h-[520px] rounded-2xl overflow-hidden glass-panel border border-surface-border relative z-10 shadow-2xl">
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
                  <div className="p-1 min-w-[240px] space-y-2 text-gray-100">
                    <div className="flex items-center gap-2 border-b border-surface-border/80 pb-2">
                      <span className="text-xl">{country.flag_emoji}</span>
                      <div>
                        <h4 className="font-bold text-sm text-white">{country.name}</h4>
                        <span className="text-[11px] text-gray-400">{country.region} • Pop: {(country.population ? country.population / 1e6 : 0).toFixed(1)}M</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCountryClick(country)}
                      className="w-full text-center py-1.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium text-xs shadow-md transition-colors mt-2"
                    >
                      View Rankings & AI Insight
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Selected Country Details Modal / Panel */}
      {selectedCountry && (
        <div className="glass-panel p-6 rounded-2xl border border-primary-500/30 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between gap-4 border-b border-surface-border pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCountry.flag_emoji}</span>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  {selectedCountry.name}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                    {selectedCountry.code}
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  GDP: {selectedCountry.gdp_usd} • Region: {selectedCountry.region}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs text-gray-400 hover:text-white bg-surface-card px-3 py-1.5 rounded-lg border border-surface-border"
            >
              Close
            </button>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-gray-400">Loading data for {selectedCountry.name}...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Summary Box */}
              <div className="lg:col-span-1 glass-panel p-4 rounded-xl border-l-4 border-l-accent-violet space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-accent-violet">
                  <span>AI Executive Summary</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {aiSummary || 'Summary generating...'}
                </p>
              </div>

              {/* Indicator Rankings Table */}
              <div className="lg:col-span-2 space-y-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-accent-saffron" />
                  Top Global Rankings ({rankings.length} Indicators)
                </div>

                <div className="max-h-60 overflow-y-auto pr-1 space-y-1.5">
                  {rankings.slice(0, 10).map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-surface-border text-xs"
                    >
                      <div>
                        <div className="font-semibold text-gray-200">{r.indicator.name}</div>
                        <div className="text-[11px] text-gray-400">{r.indicator.category?.name} • {r.source?.name}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-accent-saffron">
                          {r.rank ? `#${r.rank}` : 'N/A'}
                        </span>
                        <div className="text-[11px] text-gray-400">{r.value} {r.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
