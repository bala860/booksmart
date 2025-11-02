import React from 'react';
import { ResponseDisplay } from './ResponseDisplay';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import type { ComparisonResult } from '../types';

interface SearchResultsPageProps {
  isLoading: boolean;
  result: ComparisonResult | null;
  error: string | null;
  onBack: () => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ isLoading, result, error, onBack }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-4">
            <ChevronLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Comparison Results</h1>
          <p className="mt-1 text-black dark:text-gray-400">Here are the best deals we found for your trip.</p>
        </header>

        <main>
          <ResponseDisplay
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};