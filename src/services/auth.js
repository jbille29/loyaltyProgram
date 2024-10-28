// src/services/auth.js
import { useNavigate } from 'react-router-dom';

export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage
  window.location.href = '/login';  // Redirect to login page
};
