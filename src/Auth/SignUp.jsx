import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftPanel from './LeftPanel';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const API_BASE = process.env.REACT_APP_API_BASE;


    const navigate = useNavigate()

    const handleRegister = async () => {
        setError('');
        setSuccess('');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            setSuccess('Registration successful!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/login')
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleClick = () => {
        navigate('/login');
    };
    return (
        <div className="min-h-screen h-[92vh] flex flex-col md:flex-row justify-between p-4 md:p-8 bg-gray-900 bg-gradient-to-tr from-white to-blue-600">
            <LeftPanel />
            <div className="flex flex-col justify-center gap-2 items-start p-4 md:p-10 md:w-2/5 rounded-lg mt-8 md:mt-0">
                <h2 className="text-[38px] text-white">Welcome Sign Up System</h2>
                <p className="text-md font-poppins text-gray-100 mb-4">
                    Your gateway to seamless transactions and easy payments
                </p>

                {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
                {success && <div className="text-green-400 text-sm mb-2">{success}</div>}

                <label htmlFor="email" className="text-white">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="mahadev@lemonpay.tech"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 rounded-md text-black focus:outline-none bg-[#E6E1FAA3] placeholder-white placeholder:text-xs"
                />

                <label htmlFor="password" className="text-white">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 rounded-md text-black focus:outline-none bg-[#E6E1FAA3] placeholder-white placeholder:text-xs"
                />

                <label htmlFor="confirm-password" className="text-white">Confirm Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    placeholder="min 8 characters"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mb-3 rounded-md text-black focus:outline-none bg-[#E6E1FAA3] placeholder-white placeholder:text-xs"
                />

                <div className="flex items-center justify-between w-full mb-4">
                    <label className="flex items-center text-sm font-poppins text-white" htmlFor="remember">
                        <input id="remember" type="checkbox" className="mr-2 w-4 h-4 border !border-white" />
                        Remember me
                    </label>
                    <button onClick={handleClick} className="text-sm text-black md:text-white font-semibold hover:underline font-poppins">
                        Sign In
                    </button>
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-white text-black px-6 py-2 font-semibold rounded-md font-poppins hover:bg-blue-100 transition text-sm"
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </div>
        </div>
    );
}
