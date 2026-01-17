import React from 'react';

interface AlertProps {
    message: string;
    type: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
    const isSuccess = type === 'success';
    const baseClasses = 'text-center p-3 my-4 rounded-lg text-sm flex items-center justify-center shadow-md';
    const typeClasses = isSuccess 
        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
        : 'bg-red-500/20 text-red-300 border border-red-500/30';
    
    const icon = isSuccess ? 'fa-check-circle' : 'fa-exclamation-triangle';

    if (!message) return null;

    return (
        <div className={`${baseClasses} ${typeClasses}`} role="alert">
            <i className={`fas ${icon} mr-2 text-lg`}></i>
            <span>{message}</span>
        </div>
    );
};

export default Alert;