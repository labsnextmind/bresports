import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <div className={`bg-gray-800 p-4 rounded-lg flex items-center border-l-4 ${color}`}>
            <div className="text-3xl mr-4">
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;