import React, { useState } from 'react';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { SearchIcon } from './icons/SearchIcon';
import { TravelMode } from './TravelModeTabs';

interface SearchBarProps {
  travelMode: TravelMode;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ travelMode, onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (!from || !to || !date) {
        alert("Please fill in all fields.");
        return;
    }
    const query = `Compare ${travelMode.toLowerCase()} from ${from} to ${to} for ${date}.`;
    onSearch(query);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
      <div className="w-full sm:w-1/3 relative">
        <LocationMarkerIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>
       <ArrowRightIcon className="w-5 h-5 text-gray-400 hidden sm:block" />
       <div className="w-full sm:w-1/3 relative">
        <LocationMarkerIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>
       <div className="w-full sm:w-1/3 relative">
        <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Dates"
          className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>
      <button 
        onClick={handleSearch}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          <SearchIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
};