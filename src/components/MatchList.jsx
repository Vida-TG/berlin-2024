import React, { useState, useEffect } from 'react';
import './MatchList.css';

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [groupedMatches, setGroupedMatches] = useState({});

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://berlin-backend.onrender.com/api/matches');
                const result = await response.json();
                setMatches(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMatches();
    }, []);

    useEffect(() => {
        if (matches.length > 0) {
            const groupedMatchesByDate = matches.reduce((acc, match) => {
                const matchDate = new Date(match.date).toLocaleDateString();
                if (!acc[matchDate]) {
                    acc[matchDate] = [];
                }
                acc[matchDate].push(match);
                return acc;
            }, {});

            setGroupedMatches(groupedMatchesByDate);
            setSelectedDate(Object.keys(groupedMatchesByDate)[0]);
        }
    }, [matches]);

    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    if (matches.length === 0) {
        return <p>No matches available</p>;
    }

    return (
        <div className="match-list-container">
            <div className="tab-container">
                {Object.keys(groupedMatches).map(date => (
                    <button
                        key={date}
                        className={`tab ${date === selectedDate ? 'active' : ''}`}
                        onClick={() => setSelectedDate(date)}
                    >
                        {date}
                    </button>
                ))}
            </div>
            <div className="match-list">
                {groupedMatches[selectedDate] ? (
                    groupedMatches[selectedDate].map(match => (
                        <div className="match-card" key={match._id}>
                            <div className="teams">
                                <div className="team">
                                    <img src={`/flags/${match.teamA.toLowerCase()}.png`} alt={`${match.teamA} flag`} className="flag" />
                                    <h3>{titleCase(match.teamA)}</h3>
                                </div>
                                <div className="vs">vs</div>
                                <div className="team">
                                    <img src={`/flags/${match.teamB.toLowerCase()}.png`} alt={`${match.teamB} flag`} className="flag" />
                                    <h3>{titleCase(match.teamB)}</h3>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No matches available for the selected date.</p>
                )}
            </div>
        </div>
    );
};

export default MatchList;
