import React from 'react';
import { PlaneIcon } from './icons/PlaneIcon';
import { TrainIcon } from './icons/TrainIcon';
import { BusIcon } from './icons/BusIcon';
import { HotelIcon } from './icons/HotelIcon';
import { PackageIcon } from './icons/PackageIcon';

export type TravelMode = 'Flights' | 'Trains' | 'Buses' | 'Hotels' | 'Packages';

const modes: { name: TravelMode; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { name: 'Flights', icon: PlaneIcon },
  { name: 'Trains', icon: TrainIcon },
  { name: 'Buses', icon: BusIcon },
  { name: 'Hotels', icon: HotelIcon },
  { name: 'Packages', icon: PackageIcon },
];

interface TravelModeTabsProps {
  activeMode: TravelMode;
  setActiveMode: (mode: TravelMode) => void;
}

export const TravelModeTabs: React.FC<TravelModeTabsProps> = ({ activeMode, setActiveMode }) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-4 border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto pb-2">
      {modes.map((mode) => (
        <button
          key={mode.name}
          onClick={() => setActiveMode(mode.name)}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
            activeMode === mode.name
              ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <mode.icon className="w-5 h-5" />
          <span>{mode.name}</span>
        </button>
      ))}
    </div>
  );
};