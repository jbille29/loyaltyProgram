import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoyaltyRedirect from './pages/LoyaltyRedirect';
import LoyaltyPage from './pages/LoyaltyPage';

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />*/}
        <Route path="/" element={<Dashboard />} />
        <Route path="/loyalty" element={<LoyaltyRedirect />} />
        <Route path="/loyalty/:customerId" element={<LoyaltyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
