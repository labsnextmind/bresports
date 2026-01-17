import api from './api';
import { AuthenticatedUser, Admin } from '../types';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData extends LoginCredentials {
    username: string;
}

export const registerUser = async (data: RegisterData): Promise<AuthenticatedUser & { token: string }> => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthenticatedUser & { token: string }> => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
};

export const loginAdmin = async (credentials: LoginCredentials): Promise<Admin & { token: string }> => {
    const response = await api.post('/auth/admin/login', credentials);
     if (response.data.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
};

export const getMe = async (): Promise<any> => {
    const response = await api.get('/auth/me');
    return response.data;
}