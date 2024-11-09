import React, { useState, useEffect } from "react";
import PunchCard from "./PunchCard";

const Punchy = () => {
  const [punchCards, setPunchCards] = useState([]);

  // Load punch cards from localStorage when the component mounts
  useEffect(() => {
    const savedPunchCards = localStorage.getItem("punchCards");
    if (savedPunchCards) {
      setPunchCards(JSON.parse(savedPunchCards));
    }
  }, []);

  // Function to save punch cards to localStorage and update state
  const updatePunchCards = (newPunchCards) => {
    setPunchCards(newPunchCards);
    localStorage.setItem("punchCards", JSON.stringify(newPunchCards));
  };

  // Function to add a new punch card
  const addPunchCard = () => {
    const newCard = {
      punchCardId: Date.now(), // Unique ID based on timestamp
      punchesCollected: 0,
    };
    const newPunchCards = [...punchCards, newCard];
    updatePunchCards(newPunchCards);
  };

  // Function to increment punches for a specific punch card
  const incrementPunch = (id) => {
    const newPunchCards = punchCards.map((card) =>
      card.punchCardId === id
        ? { ...card, punchesCollected: card.punchesCollected + 1 }
        : card
    );
    updatePunchCards(newPunchCards);
  };

  // Function to remove a punch card
  const removePunchCard = (id) => {
    const newPunchCards = punchCards.filter((card) => card.punchCardId !== id);
    updatePunchCards(newPunchCards);
  };

  return (
    <div>
      <h1>Punch Card Manager</h1>
      <button onClick={addPunchCard}>Add Punch Card</button>
      <PunchCard
        punchCards={punchCards}
        incrementPunch={incrementPunch}
        removePunchCard={removePunchCard}
      />
    </div>
  );
};

export default Punchy;
