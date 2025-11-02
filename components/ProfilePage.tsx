import React from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { EditIcon } from './icons/EditIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { HeartIcon } from './icons/HeartIcon';
import type { User } from '../App';

interface ProfilePageProps {
  user: User;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Profile</h1>
          <p className="mt-1 text-black dark:text-gray-400">Manage your personal information and preferences.</p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} 
              alt="User Avatar" 
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 bg-gray-200"
            />
            <button className="absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full text-white hover:bg-indigo-700 transition-colors">
              <CameraIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
            <p className="text-black dark:text-gray-400">{user.email}</p>
            <p className="text-sm text-black dark:text-gray-500 mt-1">Joined in July 2023</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors">
            <EditIcon className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <BriefcaseIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">12</p>
              <p className="text-sm text-black dark:text-gray-400">My Bookings</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <BookmarkIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">5</p>
              <p className="text-sm text-black dark:text-gray-400">Saved Places</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <HeartIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">8</p>
              <p className="text-sm text-black dark:text-gray-400">Wishlist</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};