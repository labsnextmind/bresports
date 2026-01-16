import { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import MyTournamentsPage from './pages/MyTournamentsPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTournamentsPage from './pages/admin/AdminTournamentsPage';
import AdminManageTournamentPage from './pages/admin/AdminManageTournamentPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminRequestsPage from './pages/admin/AdminRequestsPage';

const ProtectedRoute = () => {
  const { user, isAuthLoading } = useAuth();
  if (isAuthLoading) return <SplashScreen />;
  return user ? <Layout><Outlet /></Layout> : <Navigate to="/login" replace />;
};

const AdminProtectedRoute = () => {
  const { admin, isAuthLoading } = useAuth();
  if (isAuthLoading) return <SplashScreen />;
  return admin ? <AdminLayout><Outlet /></AdminLayout> : <Navigate to="/admin/login" replace />;
};

export default function App() {
  const { isAuthLoading } = useAuth();

  useEffect(() => {
    const blockMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', blockMenu);
    return () => document.removeEventListener('contextmenu', blockMenu);
  }, []);

  if (isAuthLoading) return <SplashScreen />;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-tournaments" element={<MyTournamentsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="tournaments" element={<AdminTournamentsPage />} />
        <Route path="tournaments/:id" element={<AdminManageTournamentPage />} />
        <Route path="requests" element={<AdminRequestsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
