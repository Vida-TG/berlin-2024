import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFutbol, faTicketAlt, faGift, faTrophy, faUserShield } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ token }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="https://img.uefa.com/imgml/uefacom/euro2024/rebrand/logo-portrait.png" alt="Euro 2024" />
      </div>
      <nav>
        <Link to="/"><span><FontAwesomeIcon icon={faHome} /></span> <span>Home</span></Link>
        <Link to="/matches"><span><FontAwesomeIcon icon={faFutbol} /></span> <span>Matches</span></Link>
        <Link to="/my-bets"><span><FontAwesomeIcon icon={faTicketAlt} /></span> <span>My Bets</span></Link>
        {token && (
          <Link to="/admin/admin"><span><FontAwesomeIcon icon={faUserShield} /></span> <span>ADMIN❗</span></Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
