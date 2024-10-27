// src/pages/LoyaltyPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import styles from './LoyaltyPage.module.css';

const LoyaltyPage = () => {
  const { customerId: urlCustomerId } = useParams();
  const [searchParams] = useSearchParams();
  const [points, setPoints] = useState(0);
  const [rewardThreshold, setRewardThreshold] = useState(5);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const businessId = searchParams.get('businessId');
    if (!businessId) {
      setError('Invalid or missing business ID. Please scan the QR code again.');
      return;
    }

    let customerId = urlCustomerId || localStorage.getItem('customerId');
    if (!customerId) {
      customerId = uuidv4();
      localStorage.setItem('customerId', customerId);
      navigate(`/loyalty/${customerId}?businessId=${businessId}`);
    } else if (!urlCustomerId) {
      navigate(`/loyalty/${customerId}?businessId=${businessId}`);
    }

    const fetchPoints = async () => {
      try {
        const response = await api.post('/loyalty/track', { customerId, businessId });
        setPoints(response.data.points);
        setMessage(
          response.data.points >= rewardThreshold
            ? "Congratulations! You've earned a reward!"
            : ''
        );
      } catch (error) {
        console.error('Error fetching loyalty points:', error);
        setError('Failed to load points. Please try again.');
      }
    };

    fetchPoints();
  }, [urlCustomerId, searchParams, rewardThreshold, navigate]);

  return (
    <div className={styles.loyaltyPage}>
      <h2>Your Loyalty Status</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <p>Points: {points}</p>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default LoyaltyPage;
