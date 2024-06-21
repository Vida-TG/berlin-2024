import React from 'react';
import './MyBetsPage.css';

const MyBetsPage = () => {
    // Dummy data for bets, replace with actual data from your state or props
    const bets = [
        { team: 'Team 1', stake: 50, date: '2024-06-14' },
        { team: 'Team 3', stake: 30, date: '2024-06-15' },
    ];

    return (
        <div className="my-bets-page">
            <h1 className="bets-title">My Bets</h1>
            <ul className="bets-list">
                {bets.map((bet, index) => (
                    <li key={index}>
                        <p>Team: {bet.team}</p>
                        <p>Stake: ${bet.stake}</p>
                        <p>Date: {bet.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyBetsPage;
