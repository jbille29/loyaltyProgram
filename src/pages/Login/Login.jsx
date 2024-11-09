// src/pages/Login.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/apiSlice';
import styles from './Login.module.css';

const Login = () => {
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      const { token, business } = response;

      // Dispatch credentials to the auth slice
      dispatch(setCredentials({ businessName: business.name, businessId: business.id, accessToken: token }));

      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
        <p>
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
