import React, { useState } from 'react';
import { TravelModeTabs, TravelMode } from './TravelModeTabs';
import { SearchBar } from './SearchBar';
import { SmartSuggestions } from './SmartSuggestions';
import { RecentSearches } from './RecentSearches';
import { TopDeals } from './TopDeals';

interface DashboardPageProps {
  onSearch: (query: string) => void;
  recentSearches: string[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onSearch, recentSearches }) => {
  const [activeTravelMode, setActiveTravelMode] = useState<TravelMode>('Flights');

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Where to next?</h1>
          <p className="mt-1 text-black dark:text-gray-400">Compare and book your next trip with the power of AI.</p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <TravelModeTabs activeMode={activeTravelMode} setActiveMode={setActiveTravelMode} />
          <SearchBar travelMode={activeTravelMode} onSearch={onSearch} />
        </div>

        <SmartSuggestions onSearch={onSearch} />
        <RecentSearches searches={recentSearches} onSearch={onSearch} />
        <TopDeals />
      </div>
    </div>
  );
};