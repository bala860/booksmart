import React, { useState } from 'react';
import { BellIcon } from './icons/BellIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { GiftIcon } from './icons/GiftIcon';
import { PlaneIcon } from './icons/PlaneIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CogIcon } from './icons/CogIcon';

interface Notification {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  read: boolean;
  category: 'Promotion' | 'Booking' | 'System';
}

const initialNotifications: Notification[] = [
  { id: 1, icon: <PlaneIcon className="w-5 h-5 text-blue-500" />, title: 'Flight Confirmation', description: 'Your flight from Delhi to Mumbai on Oct 25 is confirmed.', time: '2 hours ago', read: false, category: 'Booking' },
  { id: 2, icon: <GiftIcon className="w-5 h-5 text-green-500" />, title: 'Special Offer!', description: 'Get 20% off on your next hotel booking. Use code: STAYSMART', time: '1 day ago', read: false, category: 'Promotion' },
  { id: 3, icon: <CheckCircleIcon className="w-5 h-5 text-indigo-500" />, title: 'Password Changed', description: 'Your password was successfully changed.', time: '3 days ago', read: true, category: 'System' },
  { id: 4, icon: <PlaneIcon className="w-5 h-5 text-blue-500" />, title: 'Boarding Gate Update', description: 'Your flight to Bangalore will now depart from Gate B3.', time: '5 days ago', read: true, category: 'Booking' },
];

// Fix: Add props interface to handle navigation to settings.
interface NotificationsPageProps {
  onNavigateToSettings: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigateToSettings }) => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [activeTab, setActiveTab] = useState('All');

    const toggleRead = (id: number) => {
        setNotifications(
            notifications.map(n => n.id === id ? { ...n, read: !n.read } : n)
        );
    };
    
    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };
    
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const filteredNotifications = notifications.filter(n => 
        activeTab === 'All' ? true : activeTab === 'Unread' ? !n.read : true
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Notifications</h1>
            <p className="mt-1 text-black dark:text-gray-400">You have {notifications.filter(n => !n.read).length} unread notifications.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={markAllAsRead} className="text-sm font-semibold text-indigo-600 hover:underline">
              Mark all as read
            </button>
            <button onClick={onNavigateToSettings} title="Notification Settings" className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
              <CogIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('All')} className={`px-3 py-1 text-sm font-medium rounded-md ${activeTab === 'All' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>All</button>
                    <button onClick={() => setActiveTab('Unread')} className={`px-3 py-1 text-sm font-medium rounded-md ${activeTab === 'Unread' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Unread</button>
                </nav>
            </div>
            
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredNotifications.length > 0 ? filteredNotifications.map(notification => (
                    <li key={notification.id} className={`p-4 flex items-start gap-4 transition-colors cursor-pointer ${notification.read ? 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50' : 'bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'}`}>
                        <div className="flex-shrink-0 mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                            {notification.icon}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-100">{notification.title}</h4>
                            <p className="text-sm text-black dark:text-gray-300 mt-1">{notification.description}</p>
                            <p className="text-xs text-black dark:text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={() => toggleRead(notification.id)} title={notification.read ? "Mark as unread" : "Mark as read"} className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className={`block w-2.5 h-2.5 rounded-full ${notification.read ? 'bg-gray-300 dark:bg-gray-600' : 'bg-indigo-500'}`}></span>
                            </button>
                            <button onClick={() => deleteNotification(notification.id)} title="Delete notification" className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </li>
                )) : (
                    <div className="text-center p-12 text-black dark:text-gray-400">
                        <BellIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
                        <h3 className="mt-4 text-lg font-medium">No Notifications</h3>
                        <p className="mt-1 text-sm">You're all caught up!</p>
                    </div>
                )}
            </ul>
        </div>
      </div>
    </div>
  );
};