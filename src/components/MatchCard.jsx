import React, { useEffect, useState } from 'react';
import './MatchCard.css';

const MatchCard = ({ match }) => {

    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="match-card">
            <div className="teams">
                <div className="team">
                    <img src={`/flags/${match.teamA.team.name}.png`} alt={`${match.teamA.team.name} flag`} className="flag" />
                    <div className="team-info">
                        <h3>{titleCase(match.teamA.team.name)}</h3>
                        {match.isFinished && <p className="score">{match.teamA.score}</p>}
                    </div>
                </div>
                <div className="vs">vs</div>
                <div className="team">
                    <img src={`/flags/${match.teamB.team.name}.png`} alt={`${match.teamB.team.name} flag`} className="flag" />
                    <div className="team-info">
                        <h3>{titleCase(match.teamB.team.name)}</h3>
                        {match.isFinished && <p className="score">{match.teamB.score}</p>}
                    </div>
                </div>
            </div>
            <div className="match-details">
                <p><span>Date:</span> {new Date(match.date).toLocaleDateString()}</p>
                <p><span>Time:</span> {new Date(match.date).toLocaleTimeString()}</p>
                <p><span>Stadium:</span> {titleCase(match.stadium)}</p>
                <p><span>City:</span> {titleCase(match.city)}</p>
                {match.isFinished && <p><span>Winner:</span> {titleCase(match.winningTeam)}</p>}
            </div>
        </div>
    );
};

export default MatchCard;
