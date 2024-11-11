
// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetBusinessQuery, useGetAnalyticsQuery } from '../../services/apiSlice';
import { QRCodeSVG } from 'qrcode.react';
import styles from './Dashboard.module.css';
import { logout } from '../../services/auth';

import Analytics from './Analytics';
import Info from './Info';
import RewardsPrograms from './RewardsProgramsList';

const Dashboard = () => {
  const businessId = useSelector((state) => state.auth.businessId);
  const { data: business, error: businessError, isLoading: isBusinessLoading } = useGetBusinessQuery(businessId, {
    skip: !businessId,
  });
  const { data: analytics, error: analyticsError, isLoading: isAnalyticsLoading } = useGetAnalyticsQuery(businessId, {
    skip: !businessId,
  });

  const rewardPageUrl = `https://loyalty-program-eight.vercel.app/chooseReward?businessId=${businessId}`;

  if (isBusinessLoading) return <p>Loading...</p>;
  if (businessError) return <p>Error loading business info</p>;
  
  return (
    <div className={styles.dashboard}>
      {business ? (
        <>
          {/* Welcome Message */}
          <div className={styles.welcomeMessage}>
            <h1>Welcome, {business.name || "Business Owner"}!</h1>
          </div>

          {/* Analytics, Business Info, and Rewards Programs Sections */}
          <h4>Analytics</h4>
          <Analytics />
          <h4>Rewards</h4>
          <RewardsPrograms />
          <h4>Information</h4>
          <Info />
          <section style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Scan this QR Code</h1>
            <p>Scan the QR code below to access rewards for your business.</p>
            <QRCodeSVG value={rewardPageUrl} size={256} />
            <p>Business ID: {businessId}</p>
          </section>
        
        </>
      ) : (
        <p>No business information available. Please check your settings or contact support.</p>
      )}
    </div>
  )
};

export default Dashboard;
