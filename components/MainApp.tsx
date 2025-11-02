import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardPage } from './DashboardPage';
import { ProfilePage } from './ProfilePage';
import { WalletPage } from './WalletPage';
import { NotificationsPage } from './NotificationsPage';
import { SettingsPage } from './SettingsPage';
import { SearchResultsPage } from './SearchResultsPage';
import { CouponsRewardsPage } from './CouponsRewardsPage'; // Import the new page
import type { User } from '../App';
import type { ComparisonResult } from '../types';
import { getTravelComparison } from '../services/geminiService';

export type MainAppPage = 'dashboard' | 'profile' | 'wallet' | 'coupons' | 'notifications' | 'settings';

interface MainAppProps {
  user: User;
  onLogout: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  onUpdateUser: (updatedUser: User) => void;
}

export const MainApp: React.FC<MainAppProps> = ({ user, onLogout, isDarkMode, setIsDarkMode, onUpdateUser }) => {
  const [activePage, setActivePage] = useState<MainAppPage>('dashboard');
  
  // State for search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<ComparisonResult | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Mumbai → Delhi', 'Hotels in Bangalore', 'Pune → Nagpur (Bus)']);
  
  // State for copied coupon codes
  const [copiedCoupons, setCopiedCoupons] = useState<Set<string>>(new Set());
  const [referralCodeCopied, setReferralCodeCopied] = useState(false);

  const handleCouponCopy = (code: string) => {
    setCopiedCoupons(prev => {
        const newSet = new Set(prev);
        newSet.add(code);
        return newSet;
    });
  };

  const handleReferralCopy = () => {
    setReferralCodeCopied(true);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    // Update recent searches state
    setRecentSearches(prevSearches => {
      const updatedSearches = [query, ...prevSearches.filter(s => s.toLowerCase() !== query.toLowerCase())];
      return updatedSearches.slice(0, 5); // Keep the last 5 searches
    });

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);
    setShowResults(true); // Switch to results view immediately

    try {
      const result = await getTravelComparison(query);
      setSearchResult(result);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSearching(false);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        if (showResults) {
          return <SearchResultsPage isLoading={isSearching} result={searchResult} error={searchError} onBack={() => setShowResults(false)} />;
        }
        return <DashboardPage onSearch={handleSearch} recentSearches={recentSearches} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'wallet':
        return <WalletPage />;
      case 'coupons':
        return <CouponsRewardsPage 
                  user={user}
                  copiedCoupons={copiedCoupons} 
                  onCopyCoupon={handleCouponCopy}
                  referralCopied={referralCodeCopied}
                  onCopyReferral={handleReferralCopy}
                />;
      case 'notifications':
        return <NotificationsPage onNavigateToSettings={() => setActivePage('settings')} />;
      case 'settings':
        return <SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} onUpdateUser={onUpdateUser} />;
      default:
        return <DashboardPage onSearch={handleSearch} recentSearches={recentSearches} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <Sidebar activePage={activePage} setActivePage={(page) => { setShowResults(false); setActivePage(page); }} onLogout={onLogout} />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};