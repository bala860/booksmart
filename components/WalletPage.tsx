import React, { useState } from 'react';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { ArrowDownCircleIcon } from './icons/ArrowDownCircleIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { VisaIcon } from './icons/VisaIcon';
import { MastercardIcon } from './icons/MastercardIcon';
import { RupayIcon } from './icons/RupayIcon';
import { TicketIcon } from './icons/TicketIcon';
import { XIcon } from './icons/XIcon';
import { banks } from '../data/banks';
import { BankIcon } from './icons/BankIcon';

const transactions = [
    { type: 'Flight Booking', description: 'Delhi to Mumbai', amount: -7500, date: '2023-10-15' },
    { type: 'Wallet Top-up', description: 'Added via UPI', amount: 10000, date: '2023-10-14' },
    { type: 'Hotel Booking', description: 'Taj Palace, Mumbai', amount: -12000, date: '2023-10-12' },
    { type: 'Refund', description: 'Cancelled bus ticket', amount: 800, date: '2023-10-11' },
];

interface Card {
    id: number;
    type: 'Visa' | 'Mastercard' | 'RuPay';
    last4: string;
    isPrimary: boolean;
}

const initialCards: Card[] = [
    { id: 1, type: 'Visa', last4: '1234', isPrimary: true },
    { id: 2, type: 'Mastercard', last4: '5678', isPrimary: false },
];

const WALLET_BALANCE = 35745.80;

export const WalletPage: React.FC = () => {
    const [isAddMoneyModalOpen, setAddMoneyModalOpen] = useState(false);
    const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
    const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
    const [cards, setCards] = useState<Card[]>(initialCards);

    // Add Card Modal State
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState<'Visa' | 'Mastercard' | 'RuPay'>('Visa');
    const [bankName, setBankName] = useState(banks[0].name);

    // Withdraw Modal State
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleAddNewCard = (e: React.FormEvent) => {
        e.preventDefault();
        const newCard: Card = {
            id: Date.now(),
            type: cardType,
            last4: cardNumber.slice(-4),
            isPrimary: false,
        };
        setCards([...cards, newCard]);
        setAddCardModalOpen(false);
        // Reset form
        setCardHolderName('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
    };

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(withdrawAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
        if (amount > WALLET_BALANCE) {
            alert('Insufficient balance for this withdrawal.');
            return;
        }
        alert(`Successfully withdrew ₹${amount.toFixed(2)}.`);
        setWithdrawModalOpen(false);
        setWithdrawAmount('');
    };
    
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Wallet</h1>
          <p className="mt-1 text-black dark:text-gray-400">Manage your balance, cards, and view transactions.</p>
        </header>

        {/* Balance and Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-black dark:text-gray-400">Current Balance</p>
            <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">₹{WALLET_BALANCE.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setAddMoneyModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors shadow">
              <PlusCircleIcon className="w-5 h-5" />
              <span>Add Money</span>
            </button>
             <button onClick={() => setWithdrawModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ArrowDownCircleIcon className="w-5 h-5" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* Saved Cards */}
        <div className="mt-8">
             <div className="flex items-center gap-3 mb-4">
                <CreditCardIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Saved Cards</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map(card => (
                    <div key={card.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {card.type === 'Visa' && <VisaIcon className="w-12 h-auto" />}
                            {card.type === 'Mastercard' && <MastercardIcon className="w-12 h-auto" />}
                            {card.type === 'RuPay' && <RupayIcon className="w-12 h-auto" />}
                            <div>
                                <p className="font-semibold text-gray-700 dark:text-gray-200">{card.type}</p>
                                <p className="text-sm text-black dark:text-gray-400">**** **** **** {card.last4}</p>
                            </div>
                        </div>
                        {card.isPrimary && <span className="text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">Primary</span>}
                    </div>
                ))}
                <button onClick={() => setAddCardModalOpen(true)} className="border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <PlusCircleIcon className="w-8 h-8 mb-2" />
                    <span className="font-semibold">Add New Card</span>
                </button>
            </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
             <div className="flex items-center gap-3 mb-4">
                <HistoryIcon className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Recent Transactions</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((tx, index) => (
                        <li key={index} className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                                    {tx.amount > 0 ? <PlusCircleIcon className="w-5 h-5 text-green-600 dark:text-green-300" /> : <TicketIcon className="w-5 h-5 text-red-600 dark:text-red-300" />}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-100">{tx.type}</p>
                                    <p className="text-sm text-black dark:text-gray-400">{tx.description}</p>
                                </div>
                            </div>
                             <div>
                                <p className={`font-semibold text-right ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
                                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                                </p>
                                <p className="text-xs text-black dark:text-gray-500 text-right">{tx.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
      
        {/* Add Money Modal */}
        {isAddMoneyModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Add Money to Wallet</h3>
                        <button onClick={() => setAddMoneyModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
                            <input type="number" id="amount" placeholder="e.g., 5000" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </div>
                         <div>
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Payment Method</label>
                            <select id="paymentMethod" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                {cards.map(card => (
                                    <option key={card.id}>
                                        {card.type} ending in {card.last4} {card.isPrimary && '(Primary)'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                     <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-xl">
                        <button onClick={() => { alert('Money added successfully!'); setAddMoneyModalOpen(false); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg">
                            Add Money
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Withdraw Money Modal */}
        {isWithdrawModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Withdraw Money</h3>
                        <button onClick={() => setWithdrawModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <form onSubmit={handleWithdraw}>
                        <div className="p-6 space-y-4">
                            <div>
                                <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
                                <input 
                                    type="number" 
                                    id="withdraw-amount" 
                                    placeholder="e.g., 2000" 
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    required
                                />
                                <p className="text-xs text-black dark:text-gray-400 mt-1">Available: ₹{WALLET_BALANCE.toLocaleString('en-IN')}</p>
                            </div>
                             <div>
                                <label htmlFor="withdraw-destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Withdraw To</label>
                                <select id="withdraw-destination" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                    {cards.map(card => (
                                        <option key={card.id}>
                                            {card.type} ending in {card.last4}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                         <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-xl">
                            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg">
                                Withdraw Funds
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

      {/* Add Card Modal */}
        {isAddCardModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Add New Debit/Credit Card</h3>
                        <button onClick={() => setAddCardModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <form onSubmit={handleAddNewCard}>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card Preview */}
                            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col justify-between h-48">
                                <div className="flex justify-between items-start">
                                    <span className="font-semibold">{bankName}</span>
                                    {cardType === 'Visa' && <VisaIcon className="w-16 h-auto" />}
                                    {cardType === 'Mastercard' && <MastercardIcon className="w-16 h-auto" />}
                                    {cardType === 'RuPay' && <RupayIcon className="w-16 h-auto" />}
                                </div>
                                <div>
                                    <p className="text-lg tracking-widest">{cardNumber.replace(/\d{4}(?=\d)/g, "$& ") || '•••• •••• •••• ••••'}</p>
                                    <div className="flex justify-between text-sm mt-2">
                                        <span>{cardHolderName || 'CARDHOLDER NAME'}</span>
                                        <span>{expiryDate || 'MM/YY'}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-black dark:text-gray-300">Card Type</label>
                                    <select value={cardType} onChange={(e) => setCardType(e.target.value as any)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                        <option>Visa</option>
                                        <option>Mastercard</option>
                                        <option>RuPay</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-black dark:text-gray-300">Bank</label>
                                    <select value={bankName} onChange={(e) => setBankName(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                        {banks.map(bank => <option key={bank.code}>{bank.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-black dark:text-gray-300">Card Number</label>
                                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} placeholder="1234 5678 9012 3456" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-black dark:text-gray-300">Card Holder Name</label>
                                    <input type="text" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} placeholder="Alex Doe" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-black dark:text-gray-300">Expiry</label>
                                        <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="MM/YY" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-black dark:text-gray-300">CVV</label>
                                        <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength={3} placeholder="123" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 rounded-b-xl">
                            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg">
                                Save Card
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

    </div>
  );
};
