import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/auth/forgot-password', { email });
            toast.success("Password reset email sent");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMessage('Error sending password reset email');
        }
    };

    return (
        <div className="forgoten-container">
            <div className="forgoten-image"></div> 
            <div>
                <form id='formd' onSubmit={handleSubmit}>
                    <h2>Forgot Password</h2>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email" 
                    />
                    <button type="submit">Send Reset Email</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
