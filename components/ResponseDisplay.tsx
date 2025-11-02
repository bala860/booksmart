import React from 'react';
import type { ComparisonResult } from '../types';
import { SummaryIcon } from './icons/SummaryIcon';
import { TableIcon } from './icons/TableIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';


interface ResponseDisplayProps {
  result: ComparisonResult | null;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
      <div className="h-8 bg-gray-100 dark:bg-gray-700/50 rounded w-full"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-8 bg-gray-100 dark:bg-gray-700/50 rounded w-full"></div>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
    </div>
  </div>
);

const InitialState: React.FC = () => (
    <div className="text-center py-10 px-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Ready to find your next adventure?</h3>
        <p className="mt-2 text-black dark:text-gray-400">
            Enter your travel details above and let our AI find the best deals for you.
        </p>
    </div>
);

const platformUrls: { [key: string]: string } = {
  'makemytrip': 'https://www.makemytrip.com/',
  'yatra': 'https://www.yatra.com/',
  'goibibo': 'https://www.goibibo.com/',
  'irctc': 'https://www.irctc.co.in/',
  'redbus': 'https://www.redbus.in/',
  'booking.com': 'https://www.booking.com/',
  'agoda': 'https://www.agoda.com/',
  'airbnb': 'https://www.airbnb.com/',
};

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow" role="alert">
        <p className="font-bold">Oops!</p>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!result) {
    return <InitialState />;
  }
  
  const handleBookNow = (platform: string) => {
    const platformKey = platform.toLowerCase().replace(/\s+/g, '');
    const url = platformUrls[platformKey] || `https://www.google.com/search?q=${encodeURIComponent(platform)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Summary Recommendation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <SummaryIcon className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Summary Recommendation</h3>
        </div>
        <p className="text-black dark:text-gray-300 leading-relaxed">{result.summaryRecommendation}</p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 animate-fade-in" style={{ animationDelay: '150ms' }}>
         <div className="flex items-center gap-3 mb-4">
            <TableIcon className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Comparison Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200 dark:border-gray-700">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-black dark:text-gray-400">Platform</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-black dark:text-gray-400">Type</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-black dark:text-gray-400">Estimated Price (₹)</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-black dark:text-gray-400">Notes</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-black dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {result.comparisonTable.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">{item.platform}</td>
                  <td className="p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{item.type}</td>
                  <td className="p-3 text-sm text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">{item.estimatedPrice}</td>
                  <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{item.notes}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleBookNow(item.platform)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md shadow-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart Travel Tip */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-r-lg shadow-sm animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center">
            <LightbulbIcon className="w-6 h-6 mr-3 text-yellow-500"/>
            <div>
                <p className="font-bold">Smart Travel Tip</p>
                <p>{result.smartTravelTip}</p>
            </div>
        </div>
      </div>
    </div>
  );
};