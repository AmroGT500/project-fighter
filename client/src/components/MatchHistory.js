import React, { useContext, useState, useEffect } from 'react';
import '../styling/match-history.css';
import { UserContext } from '../context/user';

const MatchHistory = ({ user_id }) => {
  const {user} = useContext(UserContext)
  const matches = user && user.matches
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
    <div className='match-history-wrapper'>
      <h1 className='match-history-title'>Match History</h1>
      <div className="match-history-container">
        {matches.length === 0 ? (
          <p className='no-matches-message'>
            What are you even doing here?
            You haven't played any matches, ya scrub!
          </p>
        ) : (
          <>
            {matches.map((match, i) => (
              <div key={match.id} className="match-history-list">
                <div className="match-info">
                  <div className="match-header">
                    <h4 className='list-header'>Match #{i + 1}</h4>
                  </div>
                  <div className="match-data">
                    <div className="win-loss" style={{ color: match.win_loss ? 'green' : 'red' }}>
                      {match.win_loss ? 'Victory' : 'Defeat'}
                    </div>

                    <div className="fighter-container">
                    <div className="fighter-image">
                      <img
                        src={fighters.find(fighter => fighter.id === match.fighter1.id)?.image}
                        alt={match.fighter1.name}
                      />
                    </div>
                    <div className='your-fighter'>Your Fighter: {match.fighter1.name}</div>
                  </div>

                    <div className="opponent-container">
                    <div className="opponent-image">
                      <img
                        src={fighters.find(fighter => fighter.id === match.fighter2.id)?.image}
                        alt={match.fighter2.name}
                      />
                    </div>
                    <div className='opponent'>Opponent: {match.fighter2.name}</div>
                  </div>

                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MatchHistory;
