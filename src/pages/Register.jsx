// src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../services/api';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', loyaltyThreshold: 5 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/business/register', formData);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h2>Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="number" name="loyaltyThreshold" placeholder="Loyalty Threshold" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
