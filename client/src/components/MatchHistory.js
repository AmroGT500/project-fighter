import React from 'react';
import '../styling/match-history.css';

const MatchHistory = () => {
  const mockMatches = [
    { matchID : 1, winnerId: 123, loserId: 456, user_fighter_name : name },
    { winnerId: 789, loserId: 123 },
    // ...other matches
  ];

  return (
    <div className='match-history-wrapper'>
      <div className="match-history-container">
        <h1 className='match-history-title'>Match History</h1>
        <ul className='match-history-list'>
          {mockMatches.map((match, index) => (
            <li className='match-history-list-item' key={index}>
              Winner: {match.winnerId}, Loser: {match.loserId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MatchHistory;
