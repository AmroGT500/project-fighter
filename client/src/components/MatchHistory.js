import React, { useContext, useState, useEffect } from 'react';
import '../styling/match-history.css';
import { UserContext } from '../context/user';

const MatchHistory = ({ user_id }) => {
  const {user} = useContext(UserContext)
 const [matches, setMatches] = useState([]);
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

  useEffect(() => {
    async function fetchMatches() {
      if (!user?.id) {
        return;
      }
      try {
        const response = await fetch(`/matches/${user.id}`);
        if (response.ok) {
          const matches = await response.json();
          setMatches(matches || []);
        } else {
          console.error('Failed to fetch fighter data');
        }
      } catch (error) {
        console.error('Error fetching fighter data:', error);
      }
    }

    fetchMatches();
  }, [user]);

  if(!user) {
    return null;
  }
  
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
                  <div className="match-data">
                    <div className="win-loss" style={{ color: match.win_loss ? 'green' : 'red' }}>
                      {match.win_loss ? 'Victory' : 'Defeat'}
                    </div>
                    <div className="fighter-container">
                    <div className="fighter-image">
                      <img
                        src={fighters.find(fighter => fighter.id === match.fighter1_id)?.image}
                        // alt={match.fighter1.name}
                      />
                    </div>
                    <div className='your-fighter'>Your Fighter: {fighters.find(fighter => fighter.id === match.fighter1_id)?.name}</div>
                  </div>
                    <div className="opponent-container">
                    <div className="opponent-image">
                      <img
                        src={fighters.find(fighter => fighter.id === match.fighter2_id)?.image}
                        // alt={match.fighter2.name}
                      />
                    </div>
                    <div className='opponent'>Opponent: {fighters.find(fighter => fighter.id === match.fighter2_id)?.name}</div>
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
