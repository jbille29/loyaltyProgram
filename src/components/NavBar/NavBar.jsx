// src/components/NavBar/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => (
  <nav className={styles.navContainer}>
    <Link to="/" className={styles.navLink}>Home</Link>
    <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
    <Link to="/loyalty/me" className={styles.navLink}>Loyalty</Link>
    <Link to="/chooseReward" className={styles.navLink}>ChooseReward</Link>
    <Link to="/profile" className={styles.navLink}>Profile</Link>
  </nav>
);

export default NavBar;
