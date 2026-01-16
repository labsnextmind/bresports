import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <button
        onClick={() => login('user@test.com', '1234')}
        className="px-6 py-3 bg-blue-600 rounded-lg"
      >
        Demo Login
      </button>
    </div>
  );
}
