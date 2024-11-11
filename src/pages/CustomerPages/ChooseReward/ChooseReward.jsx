import React, { useEffect, useState } from "react";
import { useGetAllPunchCardsQuery } from "../../../services/apiSlice";
import styles from "./ChooseReward.module.css";

const ChooseReward = () => {
  const [businessName, setBusinessName] = useState("Coffee House");
  const [combinedData, setCombinedData] = useState([]);
  const [activeRewards, setActiveRewards] = useState([]);
  const [otherRewards, setOtherRewards] = useState([]);

  const businessId = "672a72e70f185f026a611789";

  const { data: punches, error, isLoading } = useGetAllPunchCardsQuery(businessId);

   // Function to generate a random vibrant color
   const getVibrantColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`; // 70% saturation, 85% lightness for vibrancy
  };

  useEffect(() => {
    const savedPunchCards = JSON.parse(localStorage.getItem("punchCards")) || [];

    if (punches) {
      const combined = punches.map((punchCard) => {
        const localCard = savedPunchCards.find(
          (card) => card.businessId === punchCard.businessId && card.punchCardId === punchCard._id
        );
        return {
          ...punchCard,
          punchesCollected: localCard ? localCard.punchesCollected : 0,
        };
      });

      const active = combined.filter(
        (card) => card.status === "active" && card.punchesCollected < card.punchesNeeded
      );
      const other = combined.filter(
        (card) => card.status === "active" || card.punchesCollected === 0
      );

      setCombinedData(combined);
      setActiveRewards(active);
      setOtherRewards(other);
    }
  }, [punches]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.selectReward}>
      <h1>Rewards at {businessName}</h1>
      
      <section className={styles.section}>
        <h4>Current Perks from {businessName}</h4>
        <ul className={styles.rewardsList}>
          {activeRewards.length > 0 ? (
            activeRewards.map((reward) => (
              <li key={reward._id} className={styles.rewardItem} style={{ backgroundColor: getVibrantColor() }}>
                <div className={styles.rewardContent}>
                  <h3>{reward.name}</h3>
                  <p className={styles.rewardDescription}>{reward.description}</p>
                </div>
                <div className={styles.rewardActions}>
                  <span className={styles.progress}>
                    {reward.punchesCollected}/{reward.punchesNeeded}
                  </span>
                  {/*<button className={styles.selectButton}>Select This Reward</button>*/}
                </div>
              </li>
            ))
          ) : (
            <p>No active rewards at the moment.</p>
          )}
        </ul>
      </section>

      <section className={styles.section}>
        <h4>More Ways to Earn</h4>
        <ul className={styles.rewardsList}>
          {otherRewards.length > 0 ? (
            otherRewards.map((reward) => (
              <li key={reward._id} className={styles.rewardItem} style={{ backgroundColor: getVibrantColor() }}>
                <div className={styles.rewardContent}>
                  <h3>{reward.name}</h3>
                  <p className={styles.rewardDescription}>{reward.description}</p>
                </div>
                <div className={styles.rewardActions}>
                  <span className={styles.progress}>
                    {reward.punchesCollected}/{reward.punchesNeeded}
                  </span>
                  {/*<button className={styles.selectButton}>Start This Reward</button>*/}
                </div>
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
