import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { ThemeContext } from '../../context/ThemeContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navWrapper}>
      <button onClick={toggleNav} className={styles.toggleButton}>
        Dev Menu
      </button>
      {isOpen && (
        <nav className={styles.navContainer}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/dashboard" className={styles.navLink}>B: Dashboard</Link>
          <Link to="/chooseReward" className={styles.navLink}>C: ChooseReward</Link>
          <Link to="/myRewards" className={styles.navLink}>C: MyRewards</Link>
          <button onClick={toggleTheme} className={styles.toggleButton}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
