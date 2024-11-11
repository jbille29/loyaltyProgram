import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllPunchCardsQuery } from '../../services/apiSlice';
import styles from './RewardsProgramsList.module.css';

const RewardsProgramsList = () => {
  const navigate = useNavigate();
  const businessId = useSelector((state) => state.auth.businessId);
  const { data: punchCards, error, isLoading } = useGetAllPunchCardsQuery(businessId);
  console.log(punchCards)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading rewards programs.</p>;

  return (
    <div className={styles.rewardsCard}>

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
          <div className={styles.leftColumn}>
            <div className={styles.rewardHeader}>
              <p>{card.name}</p>
            </div>
            <p style={{ fontSize: "1rem" }}>{card.description}</p>
            <p>Punches Needed: {card.punchesNeeded} | Expires: {new Date(card.endDate).toLocaleDateString()}</p>
          </div>
        
          <div className={styles.rightColumn}>
            <span className={styles.status}>{card.status || 'Active'}</span>
            <div className={styles.actions}>
              <button className={styles.actionButton} aria-label="Edit Program">
                <i className="fas fa-edit"></i>
              </button>
              <button className={styles.actionButton} aria-label="Duplicate Program">
                <i className="fas fa-copy"></i>
              </button>
              <button className={styles.actionButton} aria-label="Archive Program">
                <i className="fas fa-archive"></i>
              </button>
            </div>
          </div>
        </li>
        
        ))}
      </ul>
    </div>
  );
};

export default RewardsProgramsList;
