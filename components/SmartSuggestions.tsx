import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface SmartSuggestionsProps {
  onSearch: (query: string) => void;
}

const suggestions = [
  { title: 'Weekend Getaway to Goa', description: 'Flights from ₹4,500', query: 'Flights and hotels for a weekend getaway to Goa' },
  { title: 'Hill Stations in Himachal', description: 'Buses from ₹1,200', query: 'Buses to Shimla from Delhi' },
  { title: 'Hotels in Jaipur', description: 'Stays from ₹1,800/night', query: 'Hotels in Jaipur for next weekend' },
];


export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ onSearch }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <LightbulbIcon className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Smart Suggestions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            onClick={() => onSearch(suggestion.query)}
            className="w-full text-left bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <p className="font-semibold text-gray-700 dark:text-gray-200">{suggestion.title}</p>
            <p className="text-sm text-black dark:text-gray-400">{suggestion.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};