import api from './api';
import { AuthenticatedUser, User } from '../types';

export const updateUserProfile = async (profileData: Partial<User>): Promise<AuthenticatedUser> => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
};