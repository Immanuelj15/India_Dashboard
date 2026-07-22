import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomeDashboard } from './pages/HomeDashboard';
import { CountryComparison } from './pages/CountryComparison';
import { HistoricalTrends } from './pages/HistoricalTrends';
import { WorldMapPage } from './pages/WorldMapPage';
import { CategoryExplorer } from './pages/CategoryExplorer';
import { SearchPage } from './pages/SearchPage';
import { AIInsights } from './pages/AIInsights';

export const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
        <Header />

        <div className="flex-1 max-w-7xl w-full mx-auto flex items-start">
          <Sidebar />

          <main className="flex-1 p-4 lg:p-8 min-w-0">
            <Routes>
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/compare" element={<CountryComparison />} />
              <Route path="/trends" element={<HistoricalTrends />} />
              <Route path="/map" element={<WorldMapPage />} />
              <Route path="/categories" element={<CategoryExplorer />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/ai-insights" element={<AIInsights />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
