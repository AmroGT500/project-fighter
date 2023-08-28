import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/user';
import UserFighterCard from './UserFighterCard';
import CpuFighterCard from './CpuFighterCard'; 
import '../styling/fight-setup.css'; 

function FightSetup() {
  const {user, setUser} = useContext(UserContext);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    fetch('/fighters')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFighters(data);
      })
      .catch(error => {
        console.error('Error fetching fighters:', error);
      });
  }, []);

  return (
    <div className="fight-setup-container">

      <div className="fighters-container">

        <div className="fighter-list">
          {fighters.map(fighter => (
            <div key={fighter.id}>
              <img src={fighter.icon}/>
              {fighter.name}
            </div>
          ))}
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

