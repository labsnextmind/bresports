import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { DepositRequest, WithdrawalRequest } from '../../types';
import Alert from '../../components/Alert';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colorClasses: { [key: string]: string } = {
        Pending: 'bg-yellow-500/20 text-yellow-300',
        Completed: 'bg-green-500/20 text-green-300',
        Rejected: 'bg-red-500/20 text-red-300',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses[status] || 'bg-gray-500/20 text-gray-300'}`}>{status}</span>;
};

const AdminRequestsPage: React.FC = () => {
    const { depositRequests, approveDeposit, rejectDeposit, withdrawalRequests, completeWithdrawal } = useAppContext();
    const [activeTab, setActiveTab] = useState<'deposits' | 'withdrawals'>('deposits');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleAction = async (action: (id: number) => Promise<{ success: boolean, message: string }>, id: number) => {
        setMessage(null);
        const result = await action(id);
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        setTimeout(() => setMessage(null), 3000);
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage Requests</h2>
            {message && <Alert message={message.text} type={message.type} />}

            <div className="bg-gray-800 p-1 rounded-lg flex mb-6">
                <button onClick={() => setActiveTab('deposits')} className={`w-1/2 py-2 rounded ${activeTab === 'deposits' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>Deposit Requests</button>
                <button onClick={() => setActiveTab('withdrawals')} className={`w-1/2 py-2 rounded ${activeTab === 'withdrawals' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>Withdrawal Requests</button>
            </div>

            {activeTab === 'deposits' && (
                <div className="space-y-3">
                    {depositRequests.map((req: DepositRequest) => (
                        <div key={req.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{req.username}</p>
                                    <p className="text-sm text-gray-400">Amount: <span className="font-semibold text-green-400">₹{req.amount}</span></p>
                                    <p className="text-xs text-gray-500 mt-1">Txn ID: {req.transaction_id}</p>
                                </div>
                                <StatusBadge status={req.status} />
                            </div>
                            {req.status === 'Pending' && (
                                <div className="flex gap-2 mt-3">
                                    <button onClick={() => handleAction(approveDeposit, req.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1 rounded">Approve</button>
                                    <button onClick={() => handleAction(rejectDeposit, req.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1 rounded">Reject</button>
                                </div>
                            )}
                        </div>
                    ))}
                    {depositRequests.length === 0 && <p className="text-center text-gray-400 py-8">No deposit requests.</p>}
                </div>
            )}
            
            {activeTab === 'withdrawals' && (
                <div className="space-y-3">
                    {withdrawalRequests.map((req: WithdrawalRequest) => (
                        <div key={req.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                             <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{req.username}</p>
                                    <p className="text-sm text-gray-400">Amount: <span className="font-semibold text-red-400">₹{req.amount}</span></p>
                                    <p className="text-xs text-gray-500 mt-1">UPI ID: {req.upi_id}</p>
                                </div>
                                <StatusBadge status={req.status} />
                            </div>
                            {req.status === 'Pending' && (
                                <div className="mt-3">
                                    <button onClick={() => handleAction(completeWithdrawal, req.id)} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold py-1 rounded">Mark as Completed</button>
                                </div>
                            )}
                        </div>
                    ))}
                    {withdrawalRequests.length === 0 && <p className="text-center text-gray-400 py-8">No withdrawal requests.</p>}
                </div>
            )}
        </div>
    );
};

export default AdminRequestsPage;