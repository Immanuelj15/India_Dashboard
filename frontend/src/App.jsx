import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { StatCardSkeleton, ChartSkeleton } from './components/ui/SkeletonLoader';

// Lazy Loaded Pages with Code Splitting
const HomeDashboard = lazy(() => import('./pages/HomeDashboard').then((m) => ({ default: m.HomeDashboard })));
const CountryComparison = lazy(() => import('./pages/CountryComparison').then((m) => ({ default: m.CountryComparison })));
const HistoricalTrends = lazy(() => import('./pages/HistoricalTrends').then((m) => ({ default: m.HistoricalTrends })));
const WorldMapPage = lazy(() => import('./pages/WorldMapPage').then((m) => ({ default: m.WorldMapPage })));
const CategoryExplorer = lazy(() => import('./pages/CategoryExplorer').then((m) => ({ default: m.CategoryExplorer })));
const SearchPage = lazy(() => import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const AIInsights = lazy(() => import('./pages/AIInsights').then((m) => ({ default: m.AIInsights })));

const PageFallback = () => (
  <div className="space-y-6 w-full animate-fade-in">
    <div className="h-36 bg-white rounded-xl dash-card p-6 animate-pulse space-y-3">
      <div className="h-4 bg-[#E2E8F0] rounded w-48"></div>
      <div className="h-6 bg-[#E2E8F0] rounded w-96"></div>
      <div className="h-3 bg-[#E2E8F0] rounded w-2/3"></div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  </div>
);

export const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white">
        <Header />

        <div className="flex-1 w-full max-w-[1720px] mx-auto flex items-start px-4 lg:px-8">
          <main className="flex-1 py-6 min-w-0">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomeDashboard />} />
                <Route path="/compare" element={<CountryComparison />} />
                <Route path="/trends" element={<HistoricalTrends />} />
                <Route path="/map" element={<WorldMapPage />} />
                <Route path="/categories" element={<CategoryExplorer />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/ai-insights" element={<AIInsights />} />
              </Routes>
            </Suspense>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
