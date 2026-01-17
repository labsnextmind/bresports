import React, { useState } from 'react';
import { Tournament } from '../types';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Alert from './Alert';

interface TournamentCardProps {
    tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
    const { joinTournament, participants } = useAppContext();
    const { user } = useAuth();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const hasJoined = participants.some(p => p.tournament_id === tournament.id && p.user_id === user?.id);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await joinTournament(tournament.id);
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const formattedDate = new Date(tournament.match_time).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
    });

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-white">{tournament.title}</h3>
                        <p className="text-sm text-gray-400">{tournament.game_name}</p>
                    </div>
                    <span className="text-xs font-semibold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                        {tournament.status}
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center my-4">
                    <div>
                        <p className="text-xs text-gray-400">Prize Pool</p>
                        <p className="font-bold text-green-400 text-lg">₹{tournament.prize_pool}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Entry Fee</p>
                        <p className="font-bold text-orange-400 text-lg">₹{tournament.entry_fee}</p>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-300 mb-4">
                    <i className="far fa-clock mr-2"></i>{formattedDate}
                </div>

                {message && <Alert message={message.text} type={message.type} />}
                
                <form onSubmit={handleJoin}>
                    <button
                        type="submit"
                        disabled={hasJoined || tournament.status !== 'Upcoming'}
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            hasJoined 
                            ? 'bg-green-600 text-white cursor-not-allowed' 
                            : tournament.status !== 'Upcoming'
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                    >
                        {hasJoined ? 'Joined' : 'Join Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TournamentCard;