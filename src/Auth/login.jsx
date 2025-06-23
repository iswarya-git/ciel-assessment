
import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const API_BASE = process.env.REACT_APP_API_BASE;


    const handleLogin = async () => {
        setError('');
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            console.log("Login success", data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        navigate('/SignUp');
    };

    return (
        <div className="min-h-screen h-[92vh] flex flex-col md:flex-row justify-between bg-gray-900 bg-gradient-to-tr from-white to-blue-600">
            <LeftPanel />

            <div className="flex flex-col justify-center gap-2 items-start p-4 md:p-10 md:w-2/5 rounded-lg mt-8 md:mt-0">
                <h2 className="text-[38px] text-white">Welcome Login System</h2>
                <p className="text-md font-poppins text-gray-100 mb-4">
                    Your gateway to seamless transactions and easy payments
                </p>

                {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

                <label htmlFor="email" className="text-white">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mahadev@lemonpay.tech"
                    className="w-full p-2 mb-3 rounded-md text-black focus:outline-none bg-[#E6E1FAA3] placeholder-white placeholder:text-xs"
                />

                <label htmlFor="password" className="text-white">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="min 8 characters"
                    className="w-full p-2 mb-3 rounded-md text-black focus:outline-none bg-[#E6E1FAA3] placeholder-white placeholder:text-xs"
                />

                <div className="flex items-center justify-between w-full mb-4">
                    <label className="flex items-center text-sm font-poppins text-white" htmlFor="remember">
                        <input id="remember" type="checkbox" className="mr-2 w-4 h-4 border !border-white" />
                        Remember me
                    </label>
                    <button onClick={handleClick} className="text-sm text-black md:text-white font-semibold hover:underline font-poppins">
                        Sign Up
                    </button>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-white text-black px-6 py-2  font-semibold rounded-md font-poppins hover:bg-blue-100 transition text-sm"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </div>
        </div>
    );
}
