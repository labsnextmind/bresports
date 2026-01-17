import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Tournament, User } from '../types';

const JoinedTournamentCard: React.FC<{ tournament: Tournament; winner?: User }> = ({ tournament, winner }) => {
    const isLive = tournament.status === 'Live';
    const isCompleted = tournament.status === 'Completed';

    const formattedDate = new Date(tournament.match_time).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
    });

    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-white">{tournament.title}</h3>
                    <p className="text-sm text-gray-400">{tournament.game_name}</p>
                </div>
                 <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    isLive ? 'bg-red-500/20 text-red-300' : isCompleted ? 'bg-green-500/20 text-green-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                    {tournament.status}
                </span>
            </div>
            
            <p className="text-xs text-gray-400 mb-3"><i className="far fa-clock mr-2"></i>{formattedDate}</p>

            {isLive && (
                <div className="bg-gray-700/50 rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Room ID:</span>
                        <span className="font-mono text-purple-300">{tournament.room_id || 'TBA'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Password:</span>
                        <span className="font-mono text-purple-300">{tournament.room_password || 'TBA'}</span>
                    </div>
                </div>
            )}
            {isCompleted && (
                 <div className="bg-gray-700/50 rounded-lg p-3 text-sm text-center">
                    {winner ? (
                        <p>Winner: <span className="font-bold text-yellow-400">{winner.username}</span></p>
                    ) : tournament.winner_id ? (
                        <p>Result: <span className="font-semibold text-gray-300">Winner Declared</span></p>
                    ) : (
                         <p>Result: <span className="font-semibold text-gray-300">Participated</span></p>
                    )}
                 </div>
            )}
        </div>
    );
};

const MyTournamentsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
    const { user } = useAuth();
    const { participants, tournaments, usersWithWallets } = useAppContext();

    if (!user) return null;

    const joinedTournamentIds = participants
        .filter(p => p.user_id === user.id)
        .map(p => p.tournament_id);

    const myTournaments = tournaments.filter(t => joinedTournamentIds.includes(t.id));

    const upcomingOrLive = myTournaments.filter(t => t.status === 'Upcoming' || t.status === 'Live');
    const completed = myTournaments.filter(t => t.status === 'Completed' || t.status === 'Cancelled');

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">My Tournaments</h2>

            <div className="bg-gray-800 p-1 rounded-lg flex mb-6">
                <button onClick={() => setActiveTab('upcoming')} className={`w-1/2 py-2 rounded ${activeTab === 'upcoming' ? 'bg-purple-600 text-white' : 'text-gray-300'}`}>Upcoming/Live</button>
                <button onClick={() => setActiveTab('completed')} className={`w-1/2 py-2 rounded ${activeTab === 'completed' ? 'bg-purple-600 text-white' : 'text-gray-300'}`}>Completed</button>
            </div>

            <div className="space-y-4">
                {activeTab === 'upcoming' && (
                    upcomingOrLive.length > 0 ? upcomingOrLive.map(t => <JoinedTournamentCard key={t.id} tournament={t} />) : <p className="text-center text-gray-400 mt-8">You haven't joined any upcoming tournaments.</p>
                )}
                {activeTab === 'completed' && (
                    completed.length > 0 ? completed.map(t => {
                        const winner = usersWithWallets.find(u => u.id === t.winner_id);
                        return <JoinedTournamentCard key={t.id} tournament={t} winner={winner} />;
                    }) : <p className="text-center text-gray-400 mt-8">No completed tournaments found.</p>
                )}
            </div>
        </div>
    );
};

export default MyTournamentsPage;