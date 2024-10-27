// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG for SVG rendering
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loyaltyThreshold, setLoyaltyThreshold] = useState(5);
  const [business, setBusiness] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/business/register', {
        name,
        email,
        loyaltyThreshold,
      });
      setBusiness(response.data); // Store the business data after registration
      alert('Business registered successfully');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>Business Dashboard</h2>
      {!business ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Business Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="number"
            value={loyaltyThreshold}
            onChange={(e) => setLoyaltyThreshold(e.target.value)}
            placeholder="Loyalty Threshold"
          />
          <button type="submit">Register Business</button>
        </form>
      ) : (
        <div>
          <h3>Welcome, {business.name}!</h3>
          <p>Loyalty Threshold: {business.loyaltyThreshold} points</p>
          <div className={styles.qrSection}>
            <h4>Scan this QR code to track loyalty:</h4>
            <QRCodeSVG
              value={`https://loyalty-program-eight.vercel.app/loyalty?businessId=${business._id}`}
              size={128}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
              includeMargin={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
