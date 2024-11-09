import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/BusinessDashboard/Dashboard';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import LoyaltyRedirect from './pages/LoyaltyRedirect';
import LoyaltyPage from './pages/LoyaltyPage';
import PrivateRoute from './components/PrivateRoute';
import Checkout from './pages/Checkout';
import NavBar from './components/NavBar/NavBar';
import CustomerLoyaltyOverview from './pages/CustomerLoyaltyOverview/CustomerLoyaltyOverview'
import ChooseReward from './pages/CustomerPages/ChooseReward/ChooseReward'
import ProgramMaker from './pages/ProgramMaker/ProgramMaker'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        
        <Route path="/loyalty" element={<LoyaltyRedirect />} />
        <Route path="/loyalty/:businessId" element={<LoyaltyPage />} />
        <Route path="/loyalty/me" element={<CustomerLoyaltyOverview />} />

        <Route path="/chooseReward" element={<ChooseReward />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/programMaker"
          element={
            <PrivateRoute>
              <ProgramMaker />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
