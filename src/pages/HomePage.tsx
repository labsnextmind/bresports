import React from 'react';
import TournamentCard from '../components/TournamentCard';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
    const { tournaments } = useAppContext();
    const upcomingTournaments = tournaments.filter(t => t.status === 'Upcoming' || t.status === 'Live');

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">Upcoming Tournaments</h2>
            {upcomingTournaments.length > 0 ? (
                upcomingTournaments.map(tournament => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                ))
            ) : (
                <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
                    <i className="fas fa-ghost text-4xl mb-4"></i>
                    <p>No upcoming tournaments at the moment. Check back soon!</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;