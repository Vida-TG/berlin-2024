import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminLogin = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://berlin-backend.onrender.com/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                setToken(data.token);
                navigate('/admin/admin');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className='admin-page'>
            <div className="admin-container">
                <h2>Admin Login</h2>
                <form className="admin-form" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
