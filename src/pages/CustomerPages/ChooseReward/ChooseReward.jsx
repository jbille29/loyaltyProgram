import React, { useEffect, useState } from "react";
import { useGetAllPunchCardsQuery } from "../../../services/apiSlice";
import styles from "./ChooseReward.module.css";

const ChooseReward = () => {
  const [businessName, setBusinessName] = useState("Coffee House");
  const [combinedData, setCombinedData] = useState([]);
  const [activeRewards, setActiveRewards] = useState([]);
  const [otherRewards, setOtherRewards] = useState([]);

  // Get business id
  const businessId = "672a72e70f185f026a611789";


  // Pull data from API
  const { data: punches, error, isLoading } = useGetAllPunchCardsQuery(businessId);

  useEffect(() => {
    // Fetch local storage data
    const savedPunchCards = JSON.parse(localStorage.getItem("punchCards")) || [];

    // Only proceed if punches data is available
    if (punches) {
      // Combine API and local storage data
      const combined = punches.map((punchCard) => {
        const localCard = savedPunchCards.find(
          (card) => card.businessId === punchCard.businessId && card.punchCardId === punchCard._id
        );
        return {
          ...punchCard,
          punchesCollected: localCard ? localCard.punchesCollected : 0,
        };
      });

      // Separate active and other rewards
      const active = combined.filter(
        (card) => card.status === "active" && card.punchesCollected < card.punchesNeeded
      );
      const other = combined.filter(
        (card) => card.status === "active" || card.punchesCollected === 0
      );

      // Update local state
      setCombinedData(combined);
      setActiveRewards(active);
      setOtherRewards(other);
    }
  }, [punches]); // Only re-run when `punches` changes

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.selectReward}>
      <h1>Rewards at {businessName}</h1>
      
      {/* Active Rewards Section */}
      <section className={styles.section}>
        <h2>Current Perks from {businessName}</h2>
        <ul className={styles.rewardsList}>
          {activeRewards.length > 0 ? (
            activeRewards.map((reward) => (
              <li key={reward._id} className={styles.rewardItem}>
                <div className={styles.rewardContent}>
                  <h3>{reward.name}</h3>
                  <button className={styles.selectButton}>Select This Reward</button>
                </div>
                <span className={styles.progress}>
                  {reward.punchesCollected}/{reward.punchesNeeded}
                </span>
              </li>
            ))
          ) : (
            <p>No active rewards at the moment.</p>
          )}
        </ul>
      </section>

      {/* Other Rewards Section */}
      <section className={styles.section}>
        <h2>More Ways to Earn</h2>
        <ul className={styles.rewardsList}>
          {otherRewards.length > 0 ? (
            otherRewards.map((reward) => (
              <li key={reward._id} className={styles.rewardItem}>
                <div className={styles.rewardContent}>
                  <h3>{reward.name}</h3>
                  <button className={styles.selectButton}>Start This Reward</button>
                </div>
                <span className={styles.progress}>
                  {reward.punchesCollected}/{reward.punchesNeeded}
                </span>
              </li>
            ))
          ) : (
            <p>No other rewards available at the moment.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default ChooseReward;
