import React from 'react';
import './BetForm.css';

const BetPopup = ({ match, closePopup }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={closePopup}>X</button>
                <h2>Place Your Bet</h2>
                {/* Add your BetForm component here */}
                <form>
                    <input type="number" placeholder="Stake" />
                    <button type="submit">Place Bet</button>
                </form>
            </div>
        </div>
    );
};

export default BetPopup;
