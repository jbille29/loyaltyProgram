// src/pages/Home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

/*Purpose: Intro page for businesses to learn about and register for LoyaltyPro.*/
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to LoyaltyPro</h1>
      <p>Empower your business to build loyalty and reward your repeat customers effortlessly.</p>
      <p>Whether you run a coffee shop, fitness center, or boutique, LoyaltyPro helps you keep customers coming back.</p>
      <div className={styles.buttonGroup}>
        <Link to="/login" className={styles.button}>Log In</Link>
        <Link to="/register" className={styles.button}>Get Started</Link>
      </div>
    </div>
  );
};

export default Home;
