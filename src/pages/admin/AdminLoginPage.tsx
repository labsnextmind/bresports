import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../../components/Alert';

const AdminLoginPage: React.FC = () => {
    const { adminLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@bresports.com');
    const [password, setPassword] = useState('Admin@123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await adminLogin(email, password);
        setLoading(false);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold tracking-wider text-cyan-400 text-center mb-2">BR E SPORTS</h1>
                <p className="text-center text-gray-400 mb-6">Admin Panel</p>
                
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    {error && <Alert message={error} type="error" />}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-500 focus:outline-none"
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-cyan-500 focus:outline-none"
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-cyan-600 text-white p-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors disabled:bg-cyan-800"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm text-gray-400 hover:text-white underline transition-colors">
                        Switch to User Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;