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
import TopWinnersPage from './pages/TopWinnersPage';
import './App.css';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <div className="app-container">
                <Header />
                <div className="main-content">
                    <Sidebar token={token} />
                    <div className="content">
                        <Routes>
                            <Route path="/" exact element={<HomePage />} />
                            <Route path="/matches" element={<MatchesPage />} />
                            <Route path="/my-bets" element={<MyBetsPage />} />
                            <Route path="/admin/login" element={<AdminLogin setToken={setToken} />} />
                            <Route path="/admin/admin" element={<AdminPage token={token} />} />
                            <Route path="/admin/add-admin" element={<AddAdmin />} />
                            <Route path="/top-winners" element={<TopWinnersPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
            {/*<Footer />*/}
        </Router>
    );
};

export default App;
