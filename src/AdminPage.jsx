// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = ({ token }) => {
    const [matches, setMatches] = useState([]);
    const [newMatch, setNewMatch] = useState({
        teamA: '',
        teamB: '',
        date: '',
        stadium: '',
        city: '',
        isFinished: false,
        teamAScore: 0,
        teamBScore: 0,
        winningTeam: ''
    });

    useEffect(() => {
        console.log(token)
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/matches', {
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
            const response = await fetch('http://localhost:8000/api/add-match', {
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
                    stadium: '',
                    city: '',
                    isFinished: false,
                    teamAScore: 0,
                    teamBScore: 0,
                    winningTeam: ''
                });
            } else {
                console.error("Error adding match:", await response.text());
            }
        } catch (error) {
            console.error("Error adding match:", error);
        }
    };

    const handleDeleteMatch = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/delete-match/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                fetchMatches();
            } else {
                console.error("Error deleting match:", await response.text());
            }
        } catch (error) {
            console.error("Error deleting match:", error);
        }
    };

    return (
        <div className='admin-page'>
            <div className="admin-container">
                <h2>Admin Page</h2>
                <form className="admin-form" onSubmit={handleAddMatch}>
                    <input type="text" placeholder="Team A" value={newMatch.teamA} onChange={(e) => setNewMatch({ ...newMatch, teamA: e.target.value })} required />
                    <input type="text" placeholder="Team B" value={newMatch.teamB} onChange={(e) => setNewMatch({ ...newMatch, teamB: e.target.value })} required />
                    <input type="datetime-local" placeholder="Date" value={newMatch.date} onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })} required />
                    <input type="text" placeholder="Stadium" value={newMatch.stadium} onChange={(e) => setNewMatch({ ...newMatch, stadium: e.target.value })} required />
                    <input type="text" placeholder="City" value={newMatch.city} onChange={(e) => setNewMatch({ ...newMatch, city: e.target.value })} required />
                    <button type="submit">Add Match</button>
                </form>
                <h3>Existing Matches</h3>
                <ul className="match-list">
                    {matches.map(match => (
                        <li className="match-item" key={match._id}>
                            {match.teamA} vs {match.teamB} - {new Date(match.date).toLocaleString()}
                            <button onClick={() => handleDeleteMatch(match._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
