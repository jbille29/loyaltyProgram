import React from 'react';
import styles from './Analytics.module.css';

const Analytics = () => {
  return (
    <div className={styles.analyticsCard}>
      <div className={styles.analyticsGrid}>
        {/* Summary Cards */}
        <div className={styles.summaryCard}>
          <h3>Total Punches Redeemed</h3>
          <p>1,235</p>
        </div>
        <div className={styles.summaryCard}>
          <h3>Total Rewards Redeemed</h3>
          <p>482</p>
        </div>
        <div className={styles.summaryCard}>
          <h3>Customer Participation</h3>
          <p>92</p>
        </div>
      </div>

      {/* Placeholder for Monthly Redemption Trend Chart */}
      <div className={styles.chartContainer}>
        <h3>Monthly Redemption Trend</h3>
        <div className={styles.chartPlaceholder}>[Chart Placeholder]</div>
      </div>
    </div>
  );
};

export default Analytics;
