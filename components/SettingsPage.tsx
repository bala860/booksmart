

import React, { useState } from 'react';
import { GlobeIcon } from './icons/GlobeIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';
import { BellIcon } from './icons/BellIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { KeyIcon } from './icons/KeyIcon';
import { EditIcon } from './icons/EditIcon';
import { languages } from '../data/languages';
import { currencies } from '../data/currencies';
import { UserIcon } from './icons/UserIcon';
import { XIcon } from './icons/XIcon';
import { LockIcon } from './icons/LockIcon';
import type { User } from '../App';


const SettingsToggle: React.FC<{ label: string; enabled: boolean; onToggle: () => void }> = ({ label, enabled, onToggle }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 dark:text-gray-300">{label}</span>
    <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}>
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

interface SettingsPageProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode, setIsDarkMode, user, onUpdateUser }) => {
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);

    // Modal States
    const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    
    // Edit Profile Form State
    const [editedName, setEditedName] = useState(user.name);
    const [editedEmail, setEditedEmail] = useState(user.email);

    // Change Password Form State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOpenEditProfile = () => {
        setEditedName(user.name);
        setEditedEmail(user.email);
        setEditProfileModalOpen(true);
    };
    
    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser({ name: editedName, email: editedEmail });
        setEditProfileModalOpen(false);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }
        if (!newPassword || !currentPassword) {
            alert("Please fill all password fields.");
            return;
        }
        alert("Password updated successfully!");
        setChangePasswordModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
          <p className="mt-1 text-black dark:text-gray-400">Manage your account and application preferences.</p>
        </header>

        <div className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
             <div className="flex items-center gap-3 mb-4">
                <UserIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Personal Information</h3>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                        <p className="text-sm text-black dark:text-gray-400">{user.email}</p>
                    </div>
                    <button onClick={handleOpenEditProfile} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <EditIcon className="w-4 h-4" />
                        <span>Edit</span>
                    </button>
                </div>
            </div>
          </div>

          {/* Application Settings Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
             <div className="flex items-center gap-3 mb-4">
                <GlobeIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Application Settings</h3>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Theme</span>
                    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <button onClick={() => setIsDarkMode(false)} className={`px-3 py-1 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors ${!isDarkMode ? 'bg-white dark:bg-gray-800 shadow text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50'}`}>
                            <SunIcon className="w-4 h-4 text-yellow-500"/> Light
                        </button>
                        <button onClick={() => setIsDarkMode(true)} className={`px-3 py-1 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors ${isDarkMode ? 'bg-white dark:bg-gray-800 shadow text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50'}`}>
                            <MoonIcon className="w-4 h-4 text-indigo-500"/> Dark
                        </button>
                    </div>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Language</span>
                    <select className="p-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500">
                        {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                    </select>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Currency</span>
                    <select defaultValue="INR" className="p-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500">
                         {currencies.map(curr => <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>)}
                    </select>
                </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
                <BellIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Notifications</h3>
            </div>
            <div className="space-y-4">
                <SettingsToggle label="Push Notifications" enabled={pushNotifications} onToggle={() => setPushNotifications(!pushNotifications)} />
                <SettingsToggle label="Email Notifications" enabled={emailNotifications} onToggle={() => setEmailNotifications(!emailNotifications)} />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
                <ShieldCheckIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Security</h3>
            </div>
            <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Change Password</span>
                     <button onClick={() => setChangePasswordModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <KeyIcon className="w-4 h-4" />
                        <span>Change</span>
                    </button>
                </div>
                <SettingsToggle label="Two-Factor Authentication" enabled={twoFactorAuth} onToggle={() => setTwoFactorAuth(!twoFactorAuth)} />
            </div>
          </div>
        </div>
      </div>
      
        {/* Edit Profile Modal */}
        {isEditProfileModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Edit Personal Information</h3>
                        <button onClick={() => setEditProfileModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="p-6 space-y-4">
                            <div>
                                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input type="text" id="edit-name" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600" required />
                            </div>
                            <div>
                                <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <input type="email" id="edit-email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600" required />
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-xl">
                            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

      {/* Change Password Modal */}
        {isChangePasswordModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Change Password</h3>
                        <button onClick={() => setChangePasswordModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <form onSubmit={handleChangePassword}>
                        <div className="p-6 space-y-4">
                            <div>
                                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                                <div className="relative mt-1">
                                    <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="password" id="current-password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full pl-10 p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                <div className="relative mt-1">
                                    <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="password" id="new-password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full pl-10 p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600" required />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                <div className="relative mt-1">
                                    <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-10 p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600" required />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-xl">
                            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};