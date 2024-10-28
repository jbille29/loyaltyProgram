// src/pages/Pricing.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const handleCheckout = async (priceId) => {
  const stripe = await stripePromise;

  const response = await api.post('/stripe/create-checkout-session', {
    priceId,
    customerEmail: 'customer@example.com', // Replace with actual email
  });

  const sessionId = response.data.sessionId;
  stripe.redirectToCheckout({ sessionId });
};

return (
  <div>
    <h1>Choose Your Plan</h1>
    <button onClick={() => handleCheckout('price_12345')}>Basic Plan - $10/month</button>
    <button onClick={() => handleCheckout('price_67890')}>Pro Plan - $20/month</button>
  </div>
);
