import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import useLocation
import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import MatchHistory from './components/MatchHistory';
import FightSetup from './components/FightSetup';
import Battle from './components/Battle';
import { UserProvider } from './context/user';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/authentication" />} />
          <Route path="/authentication" element={<Authentication isSignupMode={false} />} /> {/* Login route */}
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

function AuthenticatedRoutes() {


  return (
    <>
      <div className="app-background"></div>
      {<Navbar />}
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/fight-setup" element={<FightSetup />} />
        <Route path="/match-history" element={<MatchHistory />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </>
  );
}

export default App;
