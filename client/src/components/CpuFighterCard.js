import React from 'react';
import '../styling/fightercard.css';

function CpuFighterCard({ fighter }) {
  return (
    <div className="fighter-card">
      <h2 className='card-title'>CPU</h2>
      {fighter && (
        <>
          <img src={fighter.image} alt={fighter.name} />
          <div> {fighter.name}</div>
          <div>HP: {fighter.hp}</div>
          <div>Attack: {fighter.ap}</div>
        </>
      )}
    </div>
  );
}

export default CpuFighterCard;