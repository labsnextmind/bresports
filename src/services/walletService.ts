import api from './api';
import { Transaction } from '../types';

interface WalletData {
    balance: number;
    transactions: Transaction[];
}

export const getWallet = async (): Promise<WalletData> => {
    const response = await api.get('/wallet');
    return response.data;
};

export const requestDeposit = async (amount: number, transactionId: string): Promise<{ message: string }> => {
    const response = await api.post('/wallet/deposit', { amount, transactionId });
    return response.data;
};

export const requestWithdrawal = async (amount: number): Promise<{ message: string }> => {
    const response = await api.post('/wallet/withdraw', { amount });
    return response.data;
};