import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Tournament } from '../../types';
import Alert from '../../components/Alert';
import { generateTitle } from '../../services/adminService';

const AdminTournamentsPage: React.FC = () => {
    const { tournaments, addTournament } = useAppContext();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [gameName, setGameName] = useState('');
    const [entryFee, setEntryFee] = useState('');
    const [prizePool, setPrizePool] = useState('');
    const [matchTime, setMatchTime] = useState('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateTitle = async () => {
        setMessage(null);
        if (!gameName.trim()) {
            setMessage({ text: 'Please enter a game name first to generate a title.', type: 'error' });
            return;
        }

        setIsGenerating(true);
        try {
            const data = await generateTitle(gameName);
            if (data.title) {
                setTitle(data.title);
            } else {
                setMessage({ text: 'AI could not generate a title. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error("Error generating title:", error);
            setMessage({ text: 'Failed to generate title. Check server logs and API Key.', type: 'error' });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAddTournament = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const newTournament = {
            title,
            game_name: gameName,
            entry_fee: parseFloat(entryFee) || 0,
            prize_pool: parseFloat(prizePool) || 0,
            match_time: new Date(matchTime).toISOString(),
            max_players: 100, // Default value
        };
        
        const result = await addTournament(newTournament);
        setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
        if (result.success) {
            setTitle(''); setGameName(''); setEntryFee(''); setPrizePool(''); setMatchTime('');
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage Tournaments</h2>

            <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
                <h3 className="font-bold mb-4">Add New Tournament</h3>
                {message && <Alert message={message.text} type={message.type} />}
                <form onSubmit={handleAddTournament} className="space-y-3">
                    <input type="text" placeholder="Game Name" value={gameName} onChange={e => setGameName(e.target.value)} required className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <div className="flex items-center gap-2">
                        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        <button type="button" onClick={handleGenerateTitle} disabled={isGenerating} title="Generate with AI" className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg disabled:bg-purple-800 disabled:cursor-wait shrink-0">
                            {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                        </button>
                    </div>
                    <input type="datetime-local" value={matchTime} onChange={e => setMatchTime(e.target.value)} required className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400" />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="Entry Fee (₹)" value={entryFee} onChange={e => setEntryFee(e.target.value)} required className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        <input type="number" placeholder="Prize Pool (₹)" value={prizePool} onChange={e => setPrizePool(e.target.value)} required className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>
                    <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 p-2 rounded font-semibold">Add Tournament</button>
                </form>
            </div>

            <div>
                <h3 className="font-bold mb-4">All Tournaments</h3>
                <div className="space-y-3">
                    {tournaments.map((t: Tournament) => (
                        <div key={t.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center border border-gray-700">
                            <div>
                                <p className="font-semibold">{t.title}</p>
                                <p className="text-xs text-gray-400">{t.game_name} - {t.status}</p>
                            </div>
                            <button onClick={() => navigate(`/admin/tournaments/${t.id}`)} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm font-semibold">Manage</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminTournamentsPage;