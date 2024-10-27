// src/pages/LoyaltyRedirect.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const LoyaltyRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get businessId from the query parameters
    const businessId = searchParams.get('businessId');
    if (!businessId) {
      console.error('Business ID is missing.');
      return;
    }

    // Check for an existing customerId in localStorage or create a new one
    let customerId = localStorage.getItem('customerId');
    if (!customerId) {
      customerId = uuidv4(); // Generate a unique customerId
      localStorage.setItem('customerId', customerId); // Store it in localStorage
    }

    // Redirect to /loyalty/:customerId with businessId as a query parameter
    navigate(`/loyalty/${customerId}?businessId=${businessId}`);
  }, [navigate, searchParams]);

  return <p>Redirecting to your loyalty status...</p>;
};

export default LoyaltyRedirect;
