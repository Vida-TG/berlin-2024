import React, { useEffect, useState } from 'react';
import './TopWinnersPage.css';

const TopWinnersPage = () => {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await fetch('https://berlin-backend.onrender.com/api/top-winners');
                const result = await response.json();
                setWinners(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWinners();
    }, []);

    const shortenWallet = (wallet) => {
        return `${wallet.slice(0, 4)}...${wallet.slice(-2)}`;
    };

    return (
        <div className="top-winners-page">
            <h1>Top Winners</h1>
            <ul className="winners-list">
                {winners.map((winner, index) => (
                    <li key={index} className="winner-item">
                        <span className="winner-wallet">{shortenWallet(winner.userWallet)}</span>
                        <span className="winner-stake">{winner.stake}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopWinnersPage;
