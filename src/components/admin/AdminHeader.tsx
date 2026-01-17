import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const AdminHeader: React.FC = () => {
    const { logout } = useAuth();
    const { loading } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 p-4 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-wider text-white">Admin Panel</h1>
                {loading && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
            </div>
            <button onClick={handleLogout} className="text-cyan-400 text-sm hover:text-white">
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
            </button>
        </header>
    );
};

export default AdminHeader;