import React, { useState, useEffect } from 'react';
import { User, Transaction } from '../../types';
import * as adminService from '../../services/adminService';
import { useAppContext } from '../../context/AppContext';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isCredit = transaction.type === 'credit';
    const formattedDate = new Date(transaction.created_at).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-600/50">
            <div>
                <p className="font-semibold text-white text-sm">{transaction.description}</p>
                <p className="text-xs text-gray-400">{formattedDate}</p>
            </div>
            <p className={`font-bold text-md ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                {isCredit ? '+' : '-'} ₹{Number(transaction.amount).toFixed(2)}
            </p>
        </div>
    );
};

const HistoryModal: React.FC<{ user: User & { wallet_balance: number }; onClose: () => void; }> = ({ user, onClose }) => {
    const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const data = await adminService.getUserTransactions(user.id);
                setUserTransactions(data);
            } catch (error) {
                console.error("Failed to fetch user transactions", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [user.id]);

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-sm border border-gray-700 shadow-lg flex flex-col max-h-[80vh]">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="font-bold text-lg">History for {user.username}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {isLoading ? (
                         <div className="text-center text-gray-400 py-8">Loading...</div>
                    ) : userTransactions.length > 0 ? (
                        userTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
                    ) : (
                        <p className="text-center text-gray-400 py-8">No transactions found for this user.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


const AdminUsersPage: React.FC = () => {
    const { usersWithWallets } = useAppContext();
    const [historyModalUser, setHistoryModalUser] = useState<(User & { wallet_balance: number }) | null>(null);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <div className="bg-gray-800 rounded-lg border border-gray-700">
                <ul className="divide-y divide-gray-700">
                    {usersWithWallets.map(user => (
                        <li key={user.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white">{user.username}</p>
                                <p className="text-sm text-gray-400">Balance: ₹{user.wallet_balance.toFixed(2)}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => setHistoryModalUser(user)} className="text-cyan-400 hover:text-white text-xl" title="View Transaction History">
                                    <i className="fas fa-history"></i>
                                </button>
                                <button className="text-red-400 hover:text-red-300 text-xl" title="Ban User (Not Implemented)">
                                    <i className="fas fa-ban"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {historyModalUser && <HistoryModal user={historyModalUser} onClose={() => setHistoryModalUser(null)} />}
        </div>
    );
};

export default AdminUsersPage;