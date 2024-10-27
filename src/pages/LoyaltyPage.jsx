// src/pages/LoyaltyPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import styles from './LoyaltyPage.module.css';

const LoyaltyPage = () => {
  const { customerId: urlCustomerId } = useParams(); // Check for customerId in the URL
  const [searchParams] = useSearchParams(); // Capture query parameters
  const [points, setPoints] = useState(0);
  const [rewardThreshold, setRewardThreshold] = useState(5);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract businessId from query parameters
    const businessId = searchParams.get('businessId');
    if (!businessId) {
      setMessage('Invalid or missing business ID.');
      return;
    }

    // Check for an existing customerId or generate a new one
    let customerId = urlCustomerId || localStorage.getItem('customerId');
    if (!customerId) {
      customerId = uuidv4(); // Generate unique customerId
      localStorage.setItem('customerId', customerId);
      navigate(`/loyalty/${customerId}?businessId=${businessId}`); // Redirect with customerId in URL
    } else if (!urlCustomerId) {
      navigate(`/loyalty/${customerId}?businessId=${businessId}`); // Redirect if customerId is in localStorage but not URL
    }

    // Fetch points and track loyalty for this customer
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
        setMessage('Failed to load points. Please try again.');
      }
    };

    fetchPoints();
  }, [urlCustomerId, searchParams, rewardThreshold, navigate]);

  return (
    <div className={styles.loyaltyPage}>
      <h2>Your Loyalty Status</h2>
      <p>Points: {points}</p>
      <p>{message}</p>
    </div>
  );
};

export default LoyaltyPage;
