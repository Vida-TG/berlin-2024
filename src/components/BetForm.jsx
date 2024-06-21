import React, { useState } from 'react';
import './BetForm.css';

const BetForm = ({ match, closePopup }) => {
    const [stake, setStake] = useState('');
    const [team, setTeam] = useState('');

    const handleStakeChange = (e) => {
        setStake(e.target.value);
    };

    const handleTeamChange = (e) => {
        setTeam(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const stakeInt = parseInt(stake, 10);
        if (stakeInt >= 1 && Number.isInteger(stakeInt)) {
            // Handle bet submission
            console.log(`Bet placed on ${team} with a stake of ${stakeInt} million tokens`);
            closePopup();
        } else {
            alert('Stake must be in multiples of 1 million tokens');
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={closePopup}>X</button>
                <h2>Place Your Bet</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="team">Select Team:</label>
                        <select id="team" value={team} onChange={handleTeamChange} required>
                            <option value="" disabled>Select a team</option>
                            <option value={match.teamA}>{match.teamA}</option>
                            <option value={match.teamB}>{match.teamB}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stake">Stake (in million tokens):</label>
                        <input 
                            type="number" 
                            id="stake" 
                            value={stake} 
                            onChange={handleStakeChange} 
                            min="1000000" 
                            step="1000000" 
                            placeholder="Enter stake" 
                            required 
                        />
                    </div>
                    <button type="submit" className="submit-btn">Place Bet</button>
                </form>
            </div>
        </div>
    );
};


export default BetForm;
