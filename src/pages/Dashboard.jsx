import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { QRCodeSVG } from 'qrcode.react';
import styles from './Dashboard.module.css';
import { logout } from '../services/auth';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loyaltyThreshold, setLoyaltyThreshold] = useState(5);
  const [business, setBusiness] = useState(null);
  const [analytics, setAnalytics] = useState({ totalCustomers: 0, totalPoints: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/business/register', {
        name,
        email,
        loyaltyThreshold,
      });
      setBusiness(response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (business) {
        try {
          const response = await api.get(`/business/${business._id}/analytics`);
          setAnalytics(response.data);
        } catch (error) {
          console.error('Failed to load analytics', error);
        }
      }
    };
    fetchAnalytics();
  }, [business]);

  return (
    <div className={styles.dashboard}>
      <h2>Business Dashboard</h2>
      <button onClick={logout}>Logout</button>
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
            <QRCodeSVG value={`https://loyalty-program-eight.vercel.app/loyalty?businessId=${business._id}`} size={128} />
          </div>
          <div className={styles.analytics}>
            <h4>Analytics</h4>
            <p>Total Customers: {analytics.totalCustomers}</p>
            <p>Total Points: {analytics.totalPoints}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
