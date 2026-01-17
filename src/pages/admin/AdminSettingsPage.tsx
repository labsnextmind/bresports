import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Alert from '../../components/Alert';

const AdminSettingsPage: React.FC = () => {
    const { adminSettings, updateAdminSettings } = useAppContext();
    const [upiId, setUpiId] = useState(adminSettings?.admin_upi_id || '');
    const [qrPreview, setQrPreview] = useState(adminSettings?.qr_code_path || '');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (adminSettings) {
            setUpiId(adminSettings.admin_upi_id);
            setQrPreview(adminSettings.qr_code_path);
        }
    }, [adminSettings]);

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (newPassword.length < 6) {
            setMessage({ text: 'New password must be at least 6 characters.', type: 'error' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ text: 'Passwords do not match.', type: 'error' });
            return;
        }
        setMessage({ text: 'Admin password updated successfully! (Mock)', type: 'success' });
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage(null), 3000);
    };

    const handleUpdateUpi = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!upiId.trim()) {
            setMessage({ text: 'UPI ID cannot be empty.', type: 'error' });
            return;
        }

        const newQrPath = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${upiId}&pn=BR%20E%20SPORTS`;
        setQrPreview(newQrPath);

        const result = await updateAdminSettings({ admin_upi_id: upiId });
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
            
            {message && <Alert message={message.text} type={message.type} />}

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
                <h3 className="font-bold text-lg mb-4">UPI Payment Details</h3>
                <form onSubmit={handleUpdateUpi} className="space-y-4">
                     <div>
                        <label className="text-sm text-gray-400 mb-1 block">Your UPI ID</label>
                        <input type="text" placeholder="your-upi@id" value={upiId} onChange={e => setUpiId(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-500 focus:outline-none"/>
                        <p className="text-xs text-gray-500 mt-1">The QR code will be generated automatically from this ID.</p>
                    </div>
                     <div>
                        {qrPreview && <img src={qrPreview} alt="QR Preview" className="mt-2 w-32 h-32 rounded-lg" />}
                    </div>
                    <button type="submit" className="w-full bg-cyan-600 text-white p-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors">Save UPI Details</button>
                </form>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-lg mb-4">Update Admin Password</h3>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Username</label>
                        <input type="text" value="admin@bresports.com" disabled className="w-full bg-gray-700/50 text-gray-400 p-3 rounded-lg border-2 border-gray-600 cursor-not-allowed"/>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">New Password</label>
                        <input type="password" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-500 focus:outline-none"/>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-500 focus:outline-none"/>
                    </div>
                    <button type="submit" className="w-full bg-gray-700 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default AdminSettingsPage;