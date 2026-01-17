import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Alert from '../../components/Alert';

const AdminManageTournamentPage: React.FC = () => {
    const { tournaments, updateTournament, participants, usersWithWallets, declareWinner } = useAppContext();
    const { id } = useParams<{ id: string }>();
    const tournamentId = parseInt(id || '0', 10);
    
    const tournament = useMemo(() => tournaments.find(t => t.id === tournamentId), [tournaments, tournamentId]);

    const [roomId, setRoomId] = useState(tournament?.room_id || '');
    const [roomPassword, setRoomPassword] = useState(tournament?.room_password || '');
    const [winnerId, setWinnerId] = useState<string>('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (tournament) {
            setRoomId(tournament.room_id || '');
            setRoomPassword(tournament.room_password || '');
        }
    }, [tournament]);

    const tournamentParticipants = useMemo(() => {
        const pIds = participants
            .filter(p => p.tournament_id === tournamentId)
            .map(p => p.user_id);
        
        return usersWithWallets.filter(u => pIds.includes(u.id));
    }, [participants, usersWithWallets, tournamentId]);

    if (!tournament) {
        return <div className="text-center text-red-400">Tournament not found.</div>;
    }

    const handleUpdateDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await updateTournament({ id: tournament.id, room_id: roomId, room_password: roomPassword });
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDeclareWinner = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!winnerId) {
            setMessage({ text: 'Please select a winner.', type: 'error' });
            return;
        }
        const result = await declareWinner(tournamentId, parseInt(winnerId, 10));
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        if(result.success) {
           setWinnerId('');
        }
        setTimeout(() => setMessage(null), 5000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-1">{tournament.title}</h2>
            <p className="text-gray-400 mb-6">{tournament.game_name}</p>

            {message && <Alert message={message.text} type={message.type} />}

            <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
                <h3 className="font-bold mb-4">Update Room Details</h3>
                <form onSubmit={handleUpdateDetails} className="space-y-4">
                    <input type="text" placeholder="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <input type="text" placeholder="Room Password" value={roomPassword} onChange={e => setRoomPassword(e.target.value)} className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 p-2 rounded font-semibold">Update Details</button>
                </form>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
                <h3 className="font-bold mb-4">Declare Winner</h3>
                <form onSubmit={handleDeclareWinner} className="space-y-4">
                    <select value={winnerId} onChange={e => setWinnerId(e.target.value)} className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" disabled={!!tournament.winner_id}>
                        <option value="">Select a winner</option>
                        {tournamentParticipants.map(p => <option key={p.id} value={p.id}>{p.username}</option>)}
                    </select>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold" disabled={!!tournament.winner_id}>
                       {tournament.winner_id ? 'Winner Declared' : 'Declare Winner & Distribute Prize'}
                    </button>
                </form>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold mb-4">Participants ({tournamentParticipants.length})</h3>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {tournamentParticipants.map(p => (
                        <li key={p.id} className="bg-gray-700 p-2 rounded flex justify-between items-center text-sm">
                            <span>{p.username}</span>
                            {tournament.winner_id === p.id && <span className="text-xs font-bold text-yellow-400">WINNER</span>}
                        </li>
                    ))}
                     {tournamentParticipants.length === 0 && <p className="text-gray-400 text-center text-sm">No participants yet.</p>}
                </ul>
            </div>
        </div>
    );
};

export default AdminManageTournamentPage;