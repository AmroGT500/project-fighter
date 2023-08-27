import React, { useContext } from 'react';
import '../styling/match-history.css';
import { UserContext } from '../context/user';

const MatchHistory = ({ user_id }) => {
  const {user} = useContext(UserContext)
  const matches = user && user.matches


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
              <ul>
                <li><h3 className='list-header'>Match #: {i + 1} </h3></li>
                <li>Win/Loss: {match.win_loss ? 'Victory' : 'Defeat'} </li>
                <li>Your Fighter: {match.fighter1.name} </li>
                <li>Opponent: {match.fighter2.name} </li>
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
  
};

export default MatchHistory;
