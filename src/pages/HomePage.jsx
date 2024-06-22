import React, { useState, useEffect } from 'react';
import BetForm from '../components/BetForm';
import './HomePage.css';

const HomePage = () => {
    const [savedMatches, setSavedMatches] = useState([]);
    const [featuredMatch, setFeaturedMatch] = useState(null);
    const [matchToBet, setMatchToBet] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://berlin-backend.onrender.com/api/matches');
                const result = await response.json();
                setSavedMatches(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMatches();
    }, []);

    useEffect(() => {
        if (savedMatches.length > 0) {
            const randomMatch = savedMatches[Math.floor(Math.random() * savedMatches.length)];
            setFeaturedMatch(randomMatch);
        }
    }, [savedMatches]);

    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const closePopup = () => {
        setMatchToBet(null);
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-background"></div>
                {featuredMatch ? (
                    <div className="hero-content">
                        <div className="team-container">
                            <div className="home-team">
                                <img src={`/flags/${featuredMatch.teamA.toLowerCase()}.png`} alt={`${featuredMatch.teamA} flag`} className="flag-large" />
                                <h1>{titleCase(featuredMatch.teamA)}</h1>
                            </div>
                            <h2>vs</h2>
                            <div className="home-team">
                                <img src={`/flags/${featuredMatch.teamB.toLowerCase()}.png`} alt={`${featuredMatch.teamB} flag`} className="flag-large" />
                                <h1>{titleCase(featuredMatch.teamB)}</h1>
                            </div>
                        </div>
                        <div className="home-match-details">
                            {featuredMatch.isFinished ? (
                                <>
                                    <p>Final Score: {featuredMatch.teamAScore} - {featuredMatch.teamBScore}</p>
                                    <p>Winner: {titleCase(featuredMatch.winningTeam)}</p>
                                </>
                            ) : (
                                <>
                                    <p>Match on {new Date(featuredMatch.date).toLocaleString()}</p>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </section>
            <div className="home-content">
                <h1 className="bet-title">Place Your Bet</h1>
                {matchToBet && <BetForm match={matchToBet} closePopup={closePopup} />}
                <div className="home-match-list">
                    {savedMatches.map((match) => (
                        <div key={match._id} className="home-match-item">
                            <p>{match.teamA} vs {match.teamB} {new Date(match.date).toLocaleString()}</p>
                            {match.isFinished ? (
                                <p className="scoreline">{match.teamAScore} - {match.teamBScore}</p>
                            ) : (
                                <button 
                                    className={`home-bet-btn ${match.deactivated ? 'deactivated' : ''}`} 
                                    onClick={() => setMatchToBet(match)}
                                    disabled={match.isFinished || match.deactivated || new Date(match.date) <= new Date()}
                                >
                                    {match.isFinished ? 'Completed' : match.deactivated ? 'Disabled' : 'Bet Now'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
