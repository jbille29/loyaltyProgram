import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllPunchCardsQuery } from '../../services/apiSlice';
import styles from './RewardsProgramsList.module.css';

const RewardsProgramsList = () => {
  const navigate = useNavigate();
  const businessId = useSelector((state) => state.auth.businessId);
  const { data: punchCards, error, isLoading } = useGetAllPunchCardsQuery(businessId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading rewards programs.</p>;

  return (
    <div className={styles.rewardsCard}>
      <h2>Rewards Programs</h2>

      {/* Button to Create a New Program */}
      <button 
        className={styles.newProgramButton}
        onClick={() => navigate("/programMaker")}
      >
        Create New Program
      </button>

      {/* List of Current Rewards Programs */}
      <ul className={styles.rewardsList}>
        {punchCards.map((card) => (
          <li key={card._id} className={styles.rewardItem}>
            <div className={styles.rewardHeader}>
              <h3>{card.name}</h3>
              <span className={styles.status}>{card.status || 'Active'}</span>
            </div>
            <p>Punches Needed: {card.punchesNeeded} | Expires: {new Date(card.endDate).toLocaleDateString()}</p>
            <div className={styles.actions}>
              <button className={styles.actionButton}>Edit Program</button>
              <button className={styles.actionButton}>Duplicate Program</button>
              <button className={styles.actionButton}>Archive Program</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RewardsProgramsList;
