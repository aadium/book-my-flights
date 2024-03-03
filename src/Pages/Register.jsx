import { CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !fullName || !email || !billingAddress || !password) {
            alert('All fields must be filled out');
            return;
        }
        try {
            const response = await fetch('https://bookmyflights-server.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    fullName: fullName,
                    email: email,
                    billingAddress: billingAddress,
                    password: password,
                    roles: 'ROLE_USER'
                }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                localStorage.setItem('token', jsonResponse.response);
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
                <div className="Auth-form-content">
                    <h1 className="Auth-form-title">Register</h1>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter billing address"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type='submit' className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;