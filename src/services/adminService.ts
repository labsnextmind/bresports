import api from './api';
import { Tournament, DepositRequest, WithdrawalRequest, AdminSettings, User, Transaction } from '../types';

// Tournament Management
export const createTournament = async (tournamentData: Omit<Tournament, 'id' | 'created_at' | 'status' | 'registrations_open' | 'room_id' | 'room_password'>): Promise<Tournament> => {
    const response = await api.post('/admin/tournaments', tournamentData);
    return response.data;
};

export const updateTournament = async (id: number, tournamentData: Partial<Tournament>): Promise<Tournament> => {
    const response = await api.put(`/admin/tournaments/${id}`, tournamentData);
    return response.data;
};

export const declareWinner = async (id: number, winner_id: number): Promise<{ message: string }> => {
    const response = await api.post(`/admin/tournaments/${id}/winner`, { winner_id });
    return response.data;
};

// AI Title Generation
export const generateTitle = async (game_name: string): Promise<{ title: string }> => {
    const response = await api.post('/admin/generate-title', { game_name });
    return response.data;
};

// Request Management
export const getDepositRequests = async (): Promise<DepositRequest[]> => {
    const response = await api.get('/admin/deposits');
    return response.data;
};

export const approveDeposit = async (id: number): Promise<{ message: string }> => {
    const response = await api.put(`/admin/deposits/${id}/approve`);
    return response.data;
};

export const rejectDeposit = async (id: number): Promise<{ message: string }> => {
    const response = await api.put(`/admin/deposits/${id}/reject`);
    return response.data;
};

export const getWithdrawalRequests = async (): Promise<WithdrawalRequest[]> => {
    const response = await api.get('/admin/withdrawals');
    return response.data;
};

export const completeWithdrawal = async (id: number): Promise<{ message: string }> => {
    const response = await api.put(`/admin/withdrawals/${id}/complete`);
    return response.data;
};

// User Management
export const getAllUsers = async (): Promise<(User & { wallet_balance: number })[]> => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const getUserTransactions = async (userId: number): Promise<Transaction[]> => {
    const response = await api.get(`/admin/users/${userId}/transactions`);
    return response.data;
};


// Settings
export const getSettings = async (): Promise<AdminSettings> => {
    const response = await api.get('/admin/settings');
    return response.data;
};

export const updateSettings = async (settings: { admin_upi_id: string }): Promise<{ message: string }> => {
    const response = await api.put('/admin/settings', settings);
    return response.data;
};