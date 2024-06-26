import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const countries = [
    'Albania', 'Armenia', 'Austria', 'Belgium', 'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'England', 
    'Faroe Island', 'France', 'Georgia', 'Germany', 'Gibraltar', 'Greece', 'Hungary', 'Ireland', 'Italy', 
    'Latvia', 'Malta', 'Netherlands', 'N Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Scotland', 
    'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Switzerland', 'Turkiye', 'Ukraine', 'Wales'
];

const AdminPage = ({ token }) => {
    const [matches, setMatches] = useState([]);
    const [newMatch, setNewMatch] = useState({
        teamA: '',
        teamB: '',
        date: '',
        isFinished: false,
        teamAScore: 0,
        teamBScore: 0,
        winningTeam: '',
        deactivated: false
    });
    const [editedMatch, setEditedMatch] = useState({});

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const response = await fetch('https://berlin-backend.onrender.com/api/matches', {
                headers: { 'Authorization': `${token}` }
            });
            const data = await response.json();
            setMatches(data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    const handleAddMatch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://berlin-backend.onrender.com/api/add-match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(newMatch)
            });

            if (response.status === 200) {
                fetchMatches();
                setNewMatch({
                    teamA: '',
                    teamB: '',
                    date: '',
                    isFinished: false,
                    teamAScore: 0,
                    teamBScore: 0,
                    winningTeam: '',
                    deactivated: false
                });
                alert("Match added successfully.");
            } else {
                console.error("Error adding match:", await response.text());
                alert("Error adding match.");
            }
        } catch (error) {
            console.error("Error adding match:", error);
            alert("Error adding match.");
        }
    };

    const handleDeleteMatch = async (id) => {
        try {
            const response = await fetch(`https://berlin-backend.onrender.com/api/delete-match/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                }
            });

            if (response.status === 200) {
                fetchMatches();
                alert("Match deleted successfully.");
            } else {
                console.error("Error deleting match:", await response.text());
                alert("Error deleting match.");
            }
        } catch (error) {
            console.error("Error deleting match:", error);
            alert("Error deleting match.");
        }
    };

    const handleDeleteMatchesWithoutBets = async () => {
        try {
            const response = await fetch(`https://berlin-backend.onrender.com/api/delete-matches-without-bets`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                }
            });

            if (response.status === 200) {
                fetchMatches();
                alert("Matches without bets deleted successfully.");
            } else {
                console.error("Error deleting matches without bets:", await response.text());
                alert("Error deleting matches without bets.");
            }
        } catch (error) {
            console.error("Error deleting matches without bets:", error);
            alert("Error deleting matches without bets.");
        }
    };

    const handleEditMatch = (id, field, value) => {
        setEditedMatch((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            }
        }));
    };

    const handleUpdateMatch = async (id) => {
        const { isFinished, teamAScore, teamBScore, winningTeam, deactivated } = editedMatch[id] || {};
        try {
            const response = await fetch(`https://berlin-backend.onrender.com/api/update-match/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ isFinished, teamAScore, teamBScore, winningTeam, deactivated })
            });

            if (response.status === 200) {
                fetchMatches();
                alert("Match updated successfully.");
            } else {
                console.error("Error updating match:", await response.text());
                alert("Error updating match.");
            }
        } catch (error) {
            console.error("Error updating match:", error);
            alert("Error updating match.");
        }
    };

    return (
        <div className='admin-page'>
            <div className="admin-container">
                <h2>Admin Page</h2>
                <form className="admin-form" onSubmit={handleAddMatch}>
                    <select value={newMatch.teamA} onChange={(e) => setNewMatch({ ...newMatch, teamA: e.target.value })} required>
                        <option value="">Select Team A</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    <select value={newMatch.teamB} onChange={(e) => setNewMatch({ ...newMatch, teamB: e.target.value })} required>
                        <option value="">Select Team B</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    <input type="datetime-local" placeholder="Date" value={newMatch.date} onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })} required />
                    <button type="submit">Add Match</button>
                </form>
                <button className="delete-all-btn" onClick={handleDeleteMatchesWithoutBets}>Delete Matches Without Bets</button>
                <div className='admin-table-container'>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Team A</th>
                                <th>Team B</th>
                                <th>Date</th>
                                <th>Finished</th>
                                <th>Score</th>
                                <th>Winner</th>
                                <th>Deactivate</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map(match => (
                                <tr key={match._id}>
                                    <td>{match.teamA}</td>
                                    <td>{match.teamB}</td>
                                    <td>{new Date(match.date).toLocaleString()}</td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={editedMatch[match._id]?.isFinished ?? match.isFinished} 
                                            onChange={(e) => handleEditMatch(match._id, 'isFinished', e.target.checked)}
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={editedMatch[match._id]?.teamAScore ?? match.teamAScore} 
                                            onChange={(e) => handleEditMatch(match._id, 'teamAScore', e.target.value)} 
                                            disabled={!editedMatch[match._id]?.isFinished && !match.isFinished} 
                                        />
                                        <input 
                                            type="number" 
                                            value={editedMatch[match._id]?.teamBScore ?? match.teamBScore} 
                                            onChange={(e) => handleEditMatch(match._id, 'teamBScore', e.target.value)} 
                                            disabled={!editedMatch[match._id]?.isFinished && !match.isFinished} 
                                        />
                                    </td>
                                    <td>
                                        <select 
                                            value={editedMatch[match._id]?.winningTeam ?? match.winningTeam} 
                                            onChange={(e) => handleEditMatch(match._id, 'winningTeam', e.target.value)} 
                                            disabled={!editedMatch[match._id]?.isFinished && !match.isFinished}
                                        >
                                            <option value="">Select Winner</option>
                                            <option value={match.teamA}>{match.teamA}</option>
                                            <option value={match.teamB}>{match.teamB}</option>
                                            <option value="draw">Draw</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={editedMatch[match._id]?.deactivated ?? match.deactivated} 
                                            onChange={(e) => handleEditMatch(match._id, 'deactivated', e.target.checked)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteMatch(match._id)}>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdateMatch(match._id)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
