import React from 'react';
import styles from './Info.module.css';

const Info = () => {
  return (
    <div className={styles.businessInfoCard}>
      {/* Business Name */}

      {/* Contact Information */}
      <div className={styles.infoRow}>
        <label>Email:</label>
        <span>business@example.com</span>
      </div>
      <div className={styles.infoRow}>
        <label>Phone:</label>
        <span>(123) 456-7890</span>
      </div>

      {/* Address */}
      <div className={styles.infoRow}>
        <label>Address:</label>
        <span>123 Main St, Suite 100, City, State, ZIP</span>
      </div>

      {/* Operating Hours */}
      <div className={styles.infoRow}>
        <label>Operating Hours:</label>
        <span>Mon-Fri: 9am - 5pm</span>
      </div>

      {/* Subscription Status */}
      <div className={styles.infoRow}>
        <label>Subscription Status:</label>
        <span>Pro Plan - Active</span>
      </div>
      <div className={styles.infoRow}>
        <label>Renewal Date:</label>
        <span>Dec 31, 2024</span>
      </div>

      {/* Quick Actions */}
      <div className={styles.actions}>
        <button className={`${styles.actionButton} ${styles.editButton}`}>Edit Business Info</button>
        <button className={`${styles.actionButton} ${styles.upgradeButton}`}>Upgrade Plan</button>
      </div>
    </div>
  );
};

export default Info;