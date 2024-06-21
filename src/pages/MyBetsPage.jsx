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
                    const response = await fetch(`http://localhost:8000/api/user-bets/${publicKey.toString()}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBets(data);
                    } else {
                        const errorData = await response.json();
                        setError(errorData.message);
                    }
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBets();
    }, [connected, publicKey]);

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
                        <p>Team: {bet.team}</p>
                        <p>Stake: ${bet.stake}</p>
                        <p>Date: {new Date(bet.createdAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyBetsPage;
