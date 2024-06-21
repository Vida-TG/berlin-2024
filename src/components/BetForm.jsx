import React, { useState, useEffect } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { getTokenBalance, handleStake } from './solana';
import './BetForm.css';

const BetForm = ({ match, closePopup }) => {
    const { publicKey, connected } = useWallet();
    const [stakes, setStakes] = useState(1); // Default to 1 stake
    const [team, setTeam] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (connected && publicKey) {
            (async () => {
                const balance = await getTokenBalance(publicKey);
                setBalance(balance.berlin);
            })();
        }
    }, [connected, publicKey]);

    const handleTeamChange = (e) => {
        setTeam(e.target.value);
    };

    const handleStakesChange = (e) => {
        setStakes(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalTokens = stakes * 1000000;

        if (totalTokens > balance) {
            alert('Insufficient balance to place this bet.');
            return;
        }

        if (connected && publicKey) {
            try {
                await handleStake(publicKey, stakes * 1000000);
                const response = await fetch('https://berlin-backend.onrender.com/api/place-bet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userWallet: publicKey.toString(),
                        matchId: match._id,
                        team,
                        stake: totalTokens
                    })
                });

                if (response.ok) {
                    console.log(`Bet placed on ${team} with a stake of ${stakes} million tokens`);
                    closePopup();
                } else {
                    const errorData = await response.json();
                    alert('Error placing bet: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error placing bet:', error);
                alert('Error placing bet: ' + error.message);
            }
        } else {
            alert('Please connect your wallet');
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={closePopup}>X</button>
                <h2>Place Your Bet</h2>
                {connected && <p>Your Balance: {balance} Berlin Tokens</p>}
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
                        <label htmlFor="stakes">Number of Stakes (1M Berlin each):</label>
                        <select id="stakes" value={stakes} onChange={handleStakesChange} required>
                            {[...Array(10)].map((_, index) => (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Place Bet</button>
                </form>
            </div>
        </div>
    );
};

export default BetForm;
