import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserFighterCard from './UserFighterCard';
import CpuFighterCard from './CpuFighterCard'; 
import FighterList from './FighterList';
import '../styling/fight-setup.css'; 

function FightSetup() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="fight-setup-container">
      <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
      
      <div className="fighters-container">

        <div className="fighter-list">
          <FighterList />
        </div>

        <div className="user-card">
          <UserFighterCard />
        </div>

        <h1 className="vs-title"> -- vs --</h1>

        <div className="Cpu-card">
          <CpuFighterCard />
        </div>

      </div>
    </div>
  );
}

export default FightSetup;
