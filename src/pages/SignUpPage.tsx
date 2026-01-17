import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { useAuth } from '../context/AuthContext';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        const result = await signup(username, email, password);
        setLoading(false);

        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => navigate('/'), 2000); // Redirect to home on success
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold tracking-wider text-white text-center mb-6">BR E SPORTS</h1>
                
                 <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-center mb-4">Create Account</h2>
                    {error && <Alert message={error} type="error" />}
                    {success && <Alert message={success} type="success" />}

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none"/>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none"/>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:border-purple-500 focus:outline-none"/>
                        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-800">
                             {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                     <div className="mt-4 text-center text-sm text-gray-400">
                        Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
                    </div>
                </div>
                 <div className="mt-6 text-center">
                    <Link to="/admin/login" className="text-sm text-gray-400 hover:text-white underline transition-colors">
                        Switch to Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;