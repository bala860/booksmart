import React from 'react';
import { HistoryIcon } from './icons/HistoryIcon';

interface RecentSearchesProps {
  searches: string[];
  onSearch: (query: string) => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSearch }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <HistoryIcon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Recent Searches</h3>
      </div>
       <div className="flex flex-wrap gap-2">
            {searches.length > 0 ? (
                searches.map((search, index) => (
                    <button 
                        key={index}
                        onClick={() => onSearch(search)}
                        className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        {search}
                    </button>
                ))
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Your recent searches will appear here.</p>
            )}
       </div>
    </div>
  );
};