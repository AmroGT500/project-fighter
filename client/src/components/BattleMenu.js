import React from 'react';
import '../styling/battle.css';


function BattleMenu({ onAbility }) {
    const handleUserAbilities = (abilityType) => {
        onAbility(abilityType);
    };

    return (
        <div>
            <button className='ability-buttons' onClick={() => handleUserAbilities("punch")}>Punch</button>
            <button className='ability-buttons' onClick={() => handleUserAbilities("kick")}>Kick</button>
            <button className='block-button' onClick={() => handleUserAbilities("block")}>Block</button>
            <button className='special-button' onClick={() => handleUserAbilities("special")}>Special Attack</button>
        </div>
    );
}

export default BattleMenu;
