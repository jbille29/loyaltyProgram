import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreatePunchCardMutation } from '../../services/apiSlice'; // Adjust path if needed
import styles from './ProgramMaker.module.css';


const ProgramMaker = () => {
  const businessId = useSelector((state) => state.auth.businessId);
  const [createPunchCard] = useCreatePunchCardMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    punchesNeeded: 10,
    reward: '',
  });
  const [feedback, setFeedback] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Date validation
    const today = new Date().toISOString().split("T")[0];
    if (formData.startDate < today) {
      setFeedback("Start date cannot be in the past.");
      return;
    }
    if (formData.endDate <= formData.startDate) {
      setFeedback("End date must be after the start date.");
      return;
    }
    
    try {
      await createPunchCard({
        name: formData.name,
        description: formData.reward,
        punchesNeeded: parseInt(formData.punchesNeeded),
        startDate: formData.startDate,
        endDate: formData.endDate,
        businessId,
      }).unwrap(); // Ensure mutation is handled properly
      setFeedback('Punch card created successfully!');
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        punchesNeeded: 0,
        reward: '',
      });
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating punch card:', error);
      setFeedback('Failed to create punch card. Please try again.');
    }
  };

  return (
    <div className={styles.rewardsMaker}>
      <h2>Create a Digital Punch Card</h2>
      {feedback && <p>{feedback}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Reward Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
             placeholder="e.g., Loyalty Reward for 10th Visit"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="punchesNeeded">Number of Punches Needed</label>
          <input
            type="number"
            id="punchesNeeded"
            value={formData.punchesNeeded}
            onChange={handleChange}
            placeholder="e.g., 10"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reward">Reward Description</label>
          <input
            type="text"
            id="reward"
            value={formData.reward}
            onChange={handleChange}
            placeholder="e.g., Free Coffee"
            required
          />
        </div>

        <button type="submit">Create Reward</button>
      </form>
    </div>
  );
};

export default ProgramMaker;
