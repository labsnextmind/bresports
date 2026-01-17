import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem: React.FC<{ icon: string; label: string; to: string; }> = ({ icon, label, to }) => {
    const activeClass = 'text-purple-400';
    const inactiveClass = 'text-gray-400';

    return (
        <NavLink
            to={to}
            className={({ isActive }) => `flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs ${isActive ? activeClass : inactiveClass}`}
        >
            <i className={`fas ${icon} text-xl mb-1`}></i>
            <span>{label}</span>
        </NavLink>
    );
};

const BottomNav: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-gray-800 border-t border-gray-700 flex justify-around items-center shadow-lg">
            <NavItem icon="fa-home" label="Home" to="/" />
            <NavItem icon="fa-trophy" label="My Tournaments" to="/my-tournaments" />
            <NavItem icon="fa-wallet" label="Wallet" to="/wallet" />
            <NavItem icon="fa-user" label="Profile" to="/profile" />
        </div>
    );
};

export default BottomNav;