import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import MatchHistory from './components/MatchHistory';
import FightSetup from './components/FightSetup';
import Battle from './components/Battle'; 
import { useLocation } from 'react-router-dom';
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/authentication" />} />
        <Route path="/authentication" element={<Authentication isSignupMode={false} />} /> {/* Login route */}
        <Route path="/*" element={<AuthenticatedRoutes />} />
      </Routes>
    </Router>
  );
}

function AuthenticatedRoutes() {
  const location = useLocation(); 
  const isBattlePage = location.pathname === '/battle';

  return (
    <>
      <div className="app-background"></div>
      {!isBattlePage && <Navbar />}
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/fight-setup" element={<FightSetup />} />
        <Route path="/match-history" element={<MatchHistory />} />
        {!isBattlePage && <Route path="/battle" element={<Battle />} />}
      </Routes>
    </>
  );
}

export default App;

