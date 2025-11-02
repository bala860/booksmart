import React, { useState } from 'react';
import { GiftIcon } from './icons/GiftIcon';
import { StarIcon } from './icons/StarIcon';
import { ClipboardCopyIcon } from './icons/ClipboardCopyIcon';
import { TicketIcon } from './icons/TicketIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { UsersIcon } from './icons/UsersIcon';
import { ShareIcon } from './icons/ShareIcon';
import type { User } from '../App';


const rewardsData = {
    points: 12580,
    tier: 'Gold',
    nextTier: 'Platinum',
    progress: 75, // Percentage
    activity: [
        { description: 'Flight to Bangalore', points: 500, date: '2 days ago' },
        { description: 'Hotel in Goa', points: 800, date: '1 week ago' },
        { description: 'Referred a friend', points: 1000, date: '2 weeks ago' },
    ]
};

const couponsData = {
    active: [
        { code: 'FLYHIGH20', title: '20% OFF Flights', description: 'Up to ₹1500 on domestic flights.', expiry: '2023-12-31' },
        { code: 'STAYSMART', title: 'Flat ₹1000 OFF Hotels', description: 'On bookings above ₹5000.', expiry: '2023-11-30' },
    ],
    expiring: [
        { code: 'LASTCHANCE', title: '15% OFF Bus Tickets', description: 'Valid on all routes.', expiry: '3 days left' }
    ],
    personalized: [
        { code: 'JUSTFORYOU', title: 'Special Goa Hotel Deal', description: 'Get a free breakfast at select Goa hotels.', expiry: '2023-12-15' }
    ],
    newUser: [
        { code: 'NEWBIE', title: 'First Booking Discount', description: 'Flat 25% off on your first transaction.', expiry: 'N/A' }
    ]
};

interface CouponCardProps {
    coupon: { code: string; title: string; description: string; expiry: string; };
    isExpiring?: boolean;
    isCopied: boolean;
    onCopy: (code: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, isExpiring, isCopied, onCopy }) => {
    const handleCopy = () => {
        if (isCopied) return;
        navigator.clipboard.writeText(coupon.code);
        onCopy(coupon.code);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col justify-between gap-3">
            <div>
                <div className={`font-bold text-lg ${isExpiring ? 'text-orange-600 dark:text-orange-400' : 'text-gray-800 dark:text-gray-100'}`}>{coupon.title}</div>
                <p className="text-sm text-black dark:text-gray-400 mt-1">{coupon.description}</p>
            </div>
            <div>
                <div className="flex justify-between items-center mt-3 p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 tracking-wider">{coupon.code}</span>
                    <button 
                        onClick={handleCopy} 
                        disabled={isCopied}
                        className={`text-sm font-semibold flex items-center gap-1 transition ${
                            isCopied 
                                ? 'text-green-600 dark:text-green-400 cursor-default' 
                                : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                    >
                        {isCopied ? <CheckCircleIcon className="w-4 h-4" /> : <ClipboardCopyIcon className="w-4 h-4" />}
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <p className="text-xs text-black dark:text-gray-500 mt-2 text-right">Expires: {coupon.expiry}</p>
            </div>
        </div>
    );
}

interface CouponsRewardsPageProps {
  user: User;
  copiedCoupons: Set<string>;
  onCopyCoupon: (code: string) => void;
  referralCopied: boolean;
  onCopyReferral: () => void;
}

export const CouponsRewardsPage: React.FC<CouponsRewardsPageProps> = ({ user, copiedCoupons, onCopyCoupon, referralCopied, onCopyReferral }) => {
    const [activeTab, setActiveTab] = useState('Active');

    const referralCode = `${user.name.split(' ').join('').toUpperCase().slice(0, 5)}${123}`;

    const handleCopyReferral = () => {
        if (referralCopied) return;
        navigator.clipboard.writeText(referralCode);
        onCopyReferral();
    };

    const handleShare = async () => {
        const referralUrl = `https://booksmart.example.com/join?ref=${referralCode}`;
        const shareData = {
            title: 'Join BookSmart!',
            text: `Hey! I'm using BookSmart to find the best travel deals. Sign up with my code ${referralCode} and get 500 bonus points on your first booking!`,
            url: referralUrl,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                const fallbackText = `${shareData.text}\nJoin here: ${shareData.url}`;
                navigator.clipboard.writeText(fallbackText);
                alert('Referral link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
            const fallbackText = `${shareData.text}\nJoin here: ${shareData.url}`;
            navigator.clipboard.writeText(fallbackText);
            alert('Could not open share dialog. Referral link copied to clipboard instead.');
        }
    };


    const renderCoupons = () => {
        switch (activeTab) {
            case 'Active':
                return [...couponsData.active, ...couponsData.newUser].map(c => <CouponCard key={c.code} coupon={c} isCopied={copiedCoupons.has(c.code)} onCopy={onCopyCoupon} />);
            case 'Expiring Soon':
                return couponsData.expiring.map(c => <CouponCard key={c.code} coupon={c} isExpiring isCopied={copiedCoupons.has(c.code)} onCopy={onCopyCoupon} />);
            case 'Personalized':
                return couponsData.personalized.map(c => <CouponCard key={c.code} coupon={c} isCopied={copiedCoupons.has(c.code)} onCopy={onCopyCoupon} />);
            default:
                return [];
        }
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Coupons & Rewards</h1>
                    <p className="mt-1 text-black dark:text-gray-400">Your collection of deals and loyalty points.</p>
                </header>

                {/* Current Rewards Section */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <StarIcon className="w-6 h-6 text-yellow-500" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Current Rewards</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-sm text-black dark:text-gray-400">Points Balance</p>
                            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 my-2">{rewardsData.points.toLocaleString()}</p>
                            <p className="text-xs text-black dark:text-gray-500">Redeem points on your next booking!</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold text-gray-800 dark:text-gray-100">Tier: {rewardsData.tier}</p>
                                <p className="text-sm text-black dark:text-gray-400">Next: {rewardsData.nextTier}</p>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${rewardsData.progress}%` }}></div>
                            </div>
                            <p className="text-xs text-black dark:text-gray-500 mt-2 text-center">{100 - rewardsData.progress}% to Platinum Tier</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Recent Activity</h4>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {rewardsData.activity.map((item, index) => (
                                <li key={index} className="py-3 flex justify-between items-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600 dark:text-green-400">+{item.points} pts</p>
                                        <p className="text-xs text-black dark:text-gray-500">{item.date}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* Refer a Friend Section */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <UsersIcon className="w-6 h-6 text-green-500" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Refer a Friend</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                        <p className="text-black dark:text-gray-300 mb-4">
                            Share your unique code with friends. When they sign up and book, you both get <span className="font-bold text-indigo-600 dark:text-indigo-400">500 bonus points!</span>
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <span className="font-mono text-lg text-indigo-600 dark:text-indigo-400 tracking-wider flex-1 text-center sm:text-left">{referralCode}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyReferral}
                                    disabled={referralCopied}
                                    className={`text-sm font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                                        referralCopied 
                                            ? 'text-green-600 dark:text-green-400 cursor-default' 
                                            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/60 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {referralCopied ? <CheckCircleIcon className="w-4 h-4" /> : <ClipboardCopyIcon className="w-4 h-4" />}
                                    {referralCopied ? 'Copied' : 'Copy'}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="text-sm font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    <ShareIcon className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Coupons Section */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <TicketIcon className="w-6 h-6 text-red-500" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Available Coupons & Offers</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                        <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex space-x-2">
                                <button onClick={() => setActiveTab('Active')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeTab === 'Active' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Active</button>
                                <button onClick={() => setActiveTab('Expiring Soon')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeTab === 'Expiring Soon' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Expiring Soon</button>
                                <button onClick={() => setActiveTab('Personalized')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeTab === 'Personalized' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>For You</button>
                            </nav>
                        </div>
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {renderCoupons()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};