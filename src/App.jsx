// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchesPage from './pages/MatchesPage';
import MyBetsPage from './pages/MyBetsPage';
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';
import AddAdmin from './AddAdmin';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
    const [matches, setMatches] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const url = 'https://euro-20242.p.rapidapi.com/matches?stage=groupStage';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '7d7d7c6b63msh4eeb57cc46e315ep1ab687jsn276c203f06b6',
                'x-rapidapi-host': 'euro-20242.p.rapidapi.com'
            }
        };

        const fetchMatches = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setMatches(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMatches();
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Header />
                <div className="main-content">
                    <Sidebar />
                    <div className="content">
                        <Routes>
                            <Route path="/" exact element={<HomePage matches={matches} />} />
                            <Route path="/matches" element={<MatchesPage matches={matches} />} />
                            <Route path="/my-bets" element={<MyBetsPage />} />
                            <Route path="/admin/login" element={<AdminLogin setToken={setToken} />} />
                            <Route path="/admin/admin" element={<AdminPage token={token} />} /><Route path="/admin/admin" element={<AdminPage token={token} />} />
                            <Route path="/admin/add-admin" element={<AddAdmin />} />
                        </Routes>
                    </div>
                </div>
            </div>
            {/*<Footer />*/}
        </Router>
    );
};

export default App;
