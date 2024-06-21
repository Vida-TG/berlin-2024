// src/components/MatchList.js
import React, { useState } from 'react';
import './MatchList.css';

const MatchList = ({ matches }) => {
    const today = new Date();
    const filteredMatches = matches
        .filter(match => {
            const matchDate = new Date(match.date);
            return !match.isFinished && matchDate > today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedMatches = filteredMatches.reduce((acc, match) => {
        const matchDate = new Date(match.date).toLocaleDateString();
        if (!acc[matchDate]) {
            acc[matchDate] = [];
        }
        acc[matchDate].push(match);
        return acc;
    }, {});

    const [selectedDate, setSelectedDate] = useState(Object.keys(groupedMatches)[0]);

    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

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
                {groupedMatches[selectedDate].map(match => (
                    <div className="match-card" key={match._id}>
                        <div className="teams">
                            <div className="team">
                                <img src={`/flags/${match.teamA.team.name}.png`} alt={`${match.teamA.team.name} flag`} className="flag" />
                                <h3>{titleCase(match.teamA.team.name)}</h3>
                            </div>
                            <div className="vs">vs</div>
                            <div className="team">
                                <img src={`/flags/${match.teamB.team.name}.png`} alt={`${match.teamB.team.name} flag`} className="flag" />
                                <h3>{titleCase(match.teamB.team.name)}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchList;
