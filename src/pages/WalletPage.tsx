import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Transaction } from '../types';
import Alert from '../components/Alert';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isCredit = transaction.type === 'credit';
    const formattedDate = new Date(transaction.created_at).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
            <div>
                <p className="font-semibold text-white">{transaction.description}</p>
                <p className="text-xs text-gray-400">{formattedDate}</p>
            </div>
            <p className={`font-bold text-lg ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                {isCredit ? '+' : '-'} ₹{Number(transaction.amount).toFixed(2)}
            </p>
        </div>
    );
};

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string; }> = ({ children, onClose, title }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl w-full max-w-sm border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="font-bold text-lg">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="p-4">{children}</div>
        </div>
    </div>
);

const WalletPage: React.FC = () => {
    const { user } = useAuth();
    const { transactions, adminSettings, requestDeposit, requestWithdrawal } = useAppContext();
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    
    if (!user) return null;
    
    // Transactions are fetched for the authenticated user in AppContext
    const userTransactions = transactions
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const handleDepositSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const amount = parseFloat(depositAmount);
        if (isNaN(amount) || amount <= 0) {
            setMessage({ text: 'Please enter a valid amount.', type: 'error' });
            return;
        }
        if (!transactionId.trim()) {
            setMessage({ text: 'Please enter the UPI Transaction ID.', type: 'error' });
            return;
        }
        const result = await requestDeposit(amount, transactionId);
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        if (result.success) {
            setDepositAmount('');
            setTransactionId('');
            setTimeout(() => {
                setShowDepositModal(false);
                setMessage(null);
            }, 2000);
        }
    };

    const handleWithdrawSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const amount = parseFloat(withdrawAmount);
        if (isNaN(amount) || amount <= 0) {
            setMessage({ text: 'Please enter a valid amount.', type: 'error' });
            return;
        }
        const result = await requestWithdrawal(amount);
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        if (result.success) {
            setWithdrawAmount('');
            setTimeout(() => {
                setShowWithdrawModal(false);
                setMessage(null);
            }, 2000);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">My Wallet</h2>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-xl text-center mb-8 shadow-lg">
                <p className="text-purple-200 text-sm">Current Balance</p>
                <p className="text-4xl font-bold text-white mt-1">₹{Number(user.wallet_balance).toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button onClick={() => setShowDepositModal(true)} className="bg-green-500/80 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                    <i className="fas fa-plus-circle mr-2"></i> Add Money
                </button>
                <button onClick={() => setShowWithdrawModal(true)} className="bg-orange-500/80 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                   <i className="fas fa-arrow-circle-down mr-2"></i> Withdraw
                </button>
            </div>
            <div>
                <h3 className="font-bold text-lg mb-4">Transaction History</h3>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    {userTransactions.length > 0 ? (
                        userTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
                    ) : (
                        <p className="text-center text-gray-400 py-4">No transactions yet.</p>
                    )}
                </div>
            </div>

            {showDepositModal && (
                <Modal title="Add Money" onClose={() => { setShowDepositModal(false); setMessage(null); }}>
                    { !adminSettings?.admin_upi_id ? (
                        <Alert message="Admin UPI details are not set. Please contact support." type="error" />
                    ) : (
                        <div>
                            <p className="text-center text-gray-300 mb-4">Scan the QR code or use the UPI ID to pay.</p>
                            {adminSettings.qr_code_path && <img src={adminSettings.qr_code_path} alt="UPI QR Code" className="w-48 h-48 mx-auto rounded-lg mb-4 border border-gray-600" />}
                            <div className="bg-gray-700 p-2 rounded-lg text-center mb-4">
                                <p className="text-gray-400 text-sm">UPI ID:</p>
                                <p className="font-mono font-bold text-purple-300">{adminSettings.admin_upi_id}</p>
                            </div>
                            <form onSubmit={handleDepositSubmit} className="space-y-4">
                                <input type="number" placeholder="Amount Paid (₹)" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none" />
                                <input type="text" placeholder="UPI Transaction ID" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none" />
                                {message && <Alert message={message.text} type={message.type} />}
                                <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Submit Request</button>
                            </form>
                        </div>
                    )}
                </Modal>
            )}

            {showWithdrawModal && (
                <Modal title="Withdraw Funds" onClose={() => { setShowWithdrawModal(false); setMessage(null); }}>
                    <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Withdraw To</label>
                            <input type="text" value={user.upi_id || 'No UPI ID set'} readOnly className="w-full bg-gray-700/50 text-gray-300 p-3 rounded-lg border-2 border-gray-600 cursor-not-allowed"/>
                            {!user.upi_id && <p className="text-xs text-yellow-400 mt-1">Please add your UPI ID on the profile page first.</p>}
                        </div>
                        <input type="number" placeholder="Amount to Withdraw (₹)" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none" />
                        {message && <Alert message={message.text} type={message.type} />}
                        <button type="submit" disabled={!user.upi_id} className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">Request Withdrawal</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default WalletPage;