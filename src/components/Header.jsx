import React from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="https://img.uefa.com/imgml/uefacom/euro2024/rebrand/logo-portrait.png" alt="Euro 2024" />
      </div>
      <div className="wallet-button">
        <WalletMultiButton />
      </div>
    </header>
  );
};

export default Header;
