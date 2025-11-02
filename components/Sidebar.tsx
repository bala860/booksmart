import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { UserIcon } from './icons/UserIcon';
import { WalletIcon } from './icons/WalletIcon';
import { BellIcon } from './icons/BellIcon';
import { CogIcon } from './icons/CogIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { PlaneIcon } from './icons/PlaneIcon';
import { GiftIcon } from './icons/GiftIcon'; // Import new icon
import { MainAppPage } from './MainApp';

interface SidebarProps {
  activePage: MainAppPage;
  setActivePage: (page: MainAppPage) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-100 text-indigo-700 font-bold dark:bg-indigo-900/50 dark:text-indigo-300'
        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout }) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-10 px-2 pt-2">
        <PlaneIcon className="w-8 h-8 text-indigo-500" />
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          BookSmart
        </h1>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem
          label="Dashboard"
          icon={<HomeIcon className="w-5 h-5" />}
          isActive={activePage === 'dashboard'}
          onClick={() => setActivePage('dashboard')}
        />
        <NavItem
          label="Profile"
          icon={<UserIcon className="w-5 h-5" />}
          isActive={activePage === 'profile'}
          onClick={() => setActivePage('profile')}
        />
        <NavItem
          label="Wallet"
          icon={<WalletIcon className="w-5 h-5" />}
          isActive={activePage === 'wallet'}
          onClick={() => setActivePage('wallet')}
        />
        <NavItem
          label="Coupons & Rewards"
          icon={<GiftIcon className="w-5 h-5" />}
          isActive={activePage === 'coupons'}
          onClick={() => setActivePage('coupons')}
        />
        <NavItem
          label="Notifications"
          icon={<BellIcon className="w-5 h-5" />}
          isActive={activePage === 'notifications'}
          onClick={() => setActivePage('notifications')}
        />
        <NavItem
          label="Settings"
          icon={<CogIcon className="w-5 h-5" />}
          isActive={activePage === 'settings'}
          onClick={() => setActivePage('settings')}
        />
      </nav>
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-4 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 transition-colors duration-200"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};