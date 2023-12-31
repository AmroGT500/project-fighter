import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/user';
import UserFighterCard from './UserFighterCard';
import CpuFighterCard from './CpuFighterCard'; 
import { useNavigate } from 'react-router-dom';
import '../styling/fight-setup.css'; 
import { fetchApi } from '../utils';

function FightSetup() {
  const { user } = useContext(UserContext);
  const [fighters, setFighters] = useState([]);
  const [selectedUserFighter, setSelectedUserFighter] = useState(null);
  const [selectedCpuFighter, setSelectedCpuFighter] = useState(null);
  const [confirmUserSelection, setConfirmUserSelection] = useState(false);
  const [startBattle, setStartBattle] = useState(false);
  const navigate = useNavigate();

  const handleUserFighterSelect = (fighter) => {
    setSelectedUserFighter(fighter);
    setConfirmUserSelection(true);
  };

  const handleConfirmSelection = () => {
    setConfirmUserSelection(false);
    const randomIndex = Math.floor(Math.random() * fighters.length);
    setSelectedCpuFighter(fighters[randomIndex]);

    setStartBattle(true);

    setTimeout(() => {
      navigate('/battle', { state: { userFighter: selectedUserFighter, cpuFighter: fighters[randomIndex] } });
    }, 5000); 

  };

  useEffect(() => {
  })

  useEffect(() => {
    fetchApi('/fighters')
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

  if (!user) {
    return null
  }

  return (
    <div className={`fight-setup-container${startBattle ? ' start-battle' : ''}`}>
      <div className='fighters-container'>
        <div className='top-row'>
          <h1>Choose Your Fighter</h1>
        </div> 
        <div className="fighter-list">
          {fighters.map(fighter => (
            <div
              key={fighter.id}
              className="fighter-box"
              onClick={() => handleUserFighterSelect(fighter)}
            >
              <div className="image-container">
                <img src={fighter.image_strip} alt={fighter.name} />
              </div>
              <div className="fighter-name">{fighter.name}</div>
            </div>
          ))}
        </div>
        <div className="user-card">
          <UserFighterCard fighter={selectedUserFighter} />
        </div>
        <h1 className="vs-title"> -- vs --</h1>
        
        <div className="Cpu-card">
          <CpuFighterCard fighter={selectedCpuFighter} />
        </div>
        {confirmUserSelection && (
          <button className="toggle-button" onClick={handleConfirmSelection}>
            Confirm?
          </button>
        )}
      </div>
      {startBattle && (
        <div className="countdown-sequence">
          <div className="fade-screen" />
          <div className="countdown-number countdown-3">3</div>
          <div className="countdown-number countdown-2">2</div>
          <div className="countdown-number countdown-1">1</div>
          <div className="countdown-text">BATTLE!</div>
        </div>
      )}
    </div>
  );
}

export default FightSetup;