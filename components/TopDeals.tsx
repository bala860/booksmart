import React from 'react';
import { TagIcon } from './icons/TagIcon';

const deals = [
  { img: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Luxury Stay in Udaipur', price: 'Up to 40% Off' },
  { img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Beach Resorts in Kerala', price: 'From ₹3,500' },
];

export const TopDeals: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <TagIcon className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Top Deals</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {deals.map(deal => (
          <div key={deal.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
            <div className="relative">
              <img src={deal.img} alt={deal.title} className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4">
                <h4 className="text-white font-bold">{deal.title}</h4>
                <p className="text-yellow-300 font-semibold text-sm">{deal.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};