import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './PasswordReset.css';


const PasswordReset = ({ match }) => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast('Passwords do not match')
            return;
        }
        try {
            await axios.post(`http://localhost:4000/api/auth/reset-password/${token}`, { password });
            toast.success("Password has been reset successfully")
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        } catch (error) {
            toast("Error resetting password")
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
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
    );
};

export default PasswordReset;
