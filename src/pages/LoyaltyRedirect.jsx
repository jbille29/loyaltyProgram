// src/pages/LoyaltyRedirect.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const LoyaltyRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const businessId = searchParams.get('businessId');
    if (!businessId) {
      setError('Business ID is missing. Please scan a valid QR code.');
      return;
    }

    let customerId = localStorage.getItem('customerId');
    if (!customerId) {
      customerId = uuidv4();
      localStorage.setItem('customerId', customerId);
    }

    navigate(`/loyalty/${customerId}?businessId=${businessId}`);
  }, [navigate, searchParams]);

  return (
    <div>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>Redirecting to your loyalty status...</p>}
    </div>
  );
};

export default LoyaltyRedirect;
