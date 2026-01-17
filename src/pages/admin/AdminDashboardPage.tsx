import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import { useAppContext } from '../../context/AppContext';

const AdminDashboardPage: React.FC = () => {
    const { usersWithWallets, tournaments, transactions, depositRequests, withdrawalRequests } = useAppContext();
    const navigate = useNavigate();

    const totalPrizeDistributed = transactions
        .filter(tx => tx.type === 'credit' && tx.description.startsWith('Prize for'))
        .reduce((sum, tx) => sum + tx.amount, 0);

    const totalRevenue = tournaments
        .filter(t => t.status === 'Completed')
        .reduce((sum, t) => sum + (t.prize_pool * 0.10), 0); // Assuming 10% commission for mock revenue

    const pendingDeposits = depositRequests.filter(d => d.status === 'Pending').length;
    const pendingWithdrawals = withdrawalRequests.filter(w => w.status === 'Pending').length;


    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard title="Total Users" value={usersWithWallets.length} icon="fa-users" color="border-cyan-500" />
                <StatCard title="Total Tournaments" value={tournaments.length} icon="fa-gamepad" color="border-purple-500" />
                <StatCard title="Prize Distributed" value={`₹${totalPrizeDistributed.toFixed(0)}`} icon="fa-trophy" color="border-green-500" />
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toFixed(0)}`} icon="fa-coins" color="border-yellow-500" />
                <StatCard title="Pending Deposits" value={pendingDeposits} icon="fa-arrow-down" color="border-blue-500" />
                <StatCard title="Pending Withdrawals" value={pendingWithdrawals} icon="fa-arrow-up" color="border-orange-500" />
            </div>

            <div className="space-y-3">
                <button 
                    onClick={() => navigate('/admin/tournaments')}
                    className="w-full bg-cyan-600 text-white p-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors flex items-center justify-center text-md">
                    <i className="fas fa-plus-circle mr-3"></i>
                    Create New Tournament
                </button>
                 <button 
                    onClick={() => navigate('/admin/requests')}
                    className="w-full bg-gray-700 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center text-md">
                    <i className="fas fa-exchange-alt mr-3"></i>
                    Manage Requests
                </button>
            </div>
        </div>
    );
};

export default AdminDashboardPage;