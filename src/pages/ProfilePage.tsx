import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

const ProfilePage: React.FC = () => {
    const { updateUserProfile } = useAppContext();
    const { user, logout } = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [upiId, setUpiId] = useState(user?.upi_id || '');
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    if (!user) return null;

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!username.trim()) {
            setMessage({ text: 'Username cannot be empty.', type: 'error' });
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setMessage({ text: 'Please enter a valid email address.', type: 'error' });
            return;
        }

        const result = await updateUserProfile({ username, email, upi_id: upiId });
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!currentPassword || !newPassword) {
            setMessage({text: "All password fields are required.", type: 'error'});
            return;
        }
        if (newPassword.length < 6) {
            setMessage({text: "New password must be at least 6 characters long.", type: 'error'});
            return;
        }
        // This is a mock action since we don't handle password changes in the frontend
        setMessage({text: "Password changed successfully! (mock)", type: 'success'});
        setCurrentPassword('');
        setNewPassword('');
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-8">My Profile</h2>
            
            {message && <Alert message={message.text} type={message.type} />}

            <form onSubmit={handleUpdateProfile} className="space-y-4 mb-8">
                <div>
                    <label className="text-sm text-gray-400 mb-1 block">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-800 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-purple-500 focus:outline-none"/>
                </div>
                <div>
                    <label className="text-sm text-gray-400 mb-1 block">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-purple-500 focus:outline-none"/>
                </div>
                <div>
                    <label className="text-sm text-gray-400 mb-1 block">UPI ID for Withdrawals</label>
                    <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" className="w-full bg-gray-800 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-purple-500 focus:outline-none"/>
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Update Profile</button>
            </form>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                 <h3 className="font-bold text-lg mb-4">Change Password</h3>
                 <form onSubmit={handleChangePassword} className="space-y-4">
                    <input type="password" placeholder="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none"/>
                    <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none"/>
                    <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg font-semibold transition-colors">Save Password</button>
                 </form>
            </div>

            <div className="mt-8">
                <button onClick={logout} className="w-full bg-red-600/80 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center">
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;