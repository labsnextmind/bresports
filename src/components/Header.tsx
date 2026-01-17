import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
    const { user } = useAuth();
    const { loading } = useAppContext();

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 p-4 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-wider text-white">BR E SPORTS</h1>
                {loading && <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>}
            </div>
            {user && (
                <div className="bg-purple-500/20 border border-purple-500 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <i className="fas fa-wallet mr-2"></i>
                    ₹{Number(user.wallet_balance).toFixed(2)}
                </div>
            )}
        </header>
    );
};

export default Header;