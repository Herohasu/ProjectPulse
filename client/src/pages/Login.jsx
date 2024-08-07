import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint.js';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/AuthSlice.js';
import './login.css';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/login', { email, password });
      const response = request.data;

      if (request.status === 200) {
        dispatch(setUser(response.user));
        toast.success(response.message);

        // Redirect based on user role
        if (response.user.role === 'admin') {
          navigate('/admin');
        } else if (response.user.role === 'faculty') {
          navigate('/faculty');
        } else if (response.user.role === 'user') {
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="register-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <button type="submit">Login</button>
          <p className="register-link">
            Not Registered? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
