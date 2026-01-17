import api from './api';
import { Tournament, Participant } from '../types';

export const getTournaments = async (): Promise<Tournament[]> => {
    const response = await api.get('/tournaments');
    return response.data;
};

export const joinTournament = async (tournamentId: number): Promise<{ message: string; newBalance: number }> => {
    const response = await api.post(`/tournaments/${tournamentId}/join`);
    return response.data;
};

// Fix: Implement the missing getMyParticipation function
export const getMyParticipation = async (): Promise<Participant[]> => {
    const response = await api.get('/tournaments/my-participation');
    return response.data;
};