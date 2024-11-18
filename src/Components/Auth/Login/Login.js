import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await login(username, password);
            setIsLoggedIn(true);
            console.log('Login successful:', data);
            navigate('/home'); // Redirect to Home component on successful login
        } catch (err) {
            setError(err.message);
            setIsLoggedIn(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoggedIn && <p style={{ color: 'green' }}>You are logged in!</p>}
        </div>
    );
}

export default Login;
