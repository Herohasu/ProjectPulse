import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './PasswordReset.css';


const PasswordReset = ({ match }) => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4000/api/auth/reset-password/${token}`, { password });
            toast.success("Password has been reset successfully")
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <div className='reseting-container'>
            <div className='reseting-image'></div>
            <div>
            <form id='reseta' onSubmit={handleSubmit}>
                <h2>Its good to change your password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default PasswordReset;
