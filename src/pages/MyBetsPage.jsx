import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import './MyBetsPage.css';

const MyBetsPage = () => {
    const { publicKey, connected } = useWallet();
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBets = async () => {
            if (connected && publicKey) {
                try {
                    const response = await fetch(`https://berlin-backend.onrender.com/api/user-bets/${publicKey.toString()}`);
                    if (response.ok) {
                        const data = await response.json();
                        setLoading(false);
                        setBets(data);
                    } else {
                        const errorData = await response.json();
                        setError(errorData.message);
                    }
                } catch (error) {
                    setLoading(false);
                    setError(error.message);
                }
            } else {
                setLoading(false);
                return <p>Please connect your wallet</p>;
            }
        };

        fetchBets();
    }, [connected, publicKey]);

    const claimReward = async (betId) => {
        try {
            const response = await fetch('https://berlin-backend.onrender.com/api/claim-rewards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    betId,
                    userWallet: publicKey.toString(),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Reward claimed successfully! You earned ${data.betReward} BERLIN`);
            } else {
                alert(`Could not to claim your reward`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="my-bets-page">
            <h1 className="bets-title">My Bets</h1>
            <ul className="bets-list">
                {bets.map((bet, index) => (
                    <li key={index}>
                        <p>{bet.team === "draw" ? `${bet.matchId.teamA} And ${bet.matchId.teamB} To Draw` : `${bet.team} To Win`}</p>
                        <p>Stake: {bet.stake} BERLIN</p>
                        <p>Date: {new Date(bet.createdAt).toLocaleDateString()}</p>
                        <p>Status: {bet.status === "true" ? (bet.status === "open" ? 'Open' : 'Won') : 'Lost'}</p>
                        {bet.status === "true" && (
                            <button className="home-bet-btn" onClick={() => claimReward(bet._id)}>Claim</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyBetsPage;
