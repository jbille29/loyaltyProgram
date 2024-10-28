// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to LoyaltyPro</h1>
      <p>Your simple solution to building customer loyalty and rewarding repeat business.</p>
      <div className={styles.buttonGroup}>
        <Link to="/login" className={styles.button}>Log In</Link>
        <Link to="/register" className={styles.button}>Register</Link>
      </div>
    </div>
  );
};

export default Home;
