import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './PasswordReset.css';

const PasswordReset = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            await axios.post(`http://localhost:4000/api/auth/reset-password/${token}`, { password });
            toast.success("Password has been reset successfully");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            toast.error("Error resetting password");
        }
    };

    return (
        <div className="reseting-container">
            <div className="reseting-image"></div>
            <div className="reset-form">
                <form id="reseta" onSubmit={handleSubmit}>
                    <h2>Reset Password</h2>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;
