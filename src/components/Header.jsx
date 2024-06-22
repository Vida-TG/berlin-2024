import React, { useState, useEffect } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { getTokenBalance } from './solana';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Header.css';

const Header = () => {
    const { publicKey, connected } = useWallet();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (connected && publicKey) {
            (async () => {
                const balance = await getTokenBalance(publicKey);
                setBalance(balance.berlin);
            })();
        }
    }, [connected, publicKey]);

    return (
        <header className="header">
            <div className="logo">
                <img src="https://img.uefa.com/imgml/uefacom/euro2024/rebrand/logo-portrait.png" alt="Euro 2024" />
            </div>
            <div className="wallet-button">
                {connected && <span style={{fontSize:"12px", marginRight:"5px"}}>Balance: {balance.toLocaleString()} BERLIN</span>}
                <WalletMultiButton />
            </div>
        </header>
    );
};

export default Header;
