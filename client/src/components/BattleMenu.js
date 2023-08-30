import React from 'react';

function BattleMenu({ onAbility }) {
    const handleUserAbilities = (abilityType) => {
        onAbility(abilityType);
    };

    return (
        <div>
            <button onClick={() => handleUserAbilities("punch")}>Punch</button>
            <button onClick={() => handleUserAbilities("kick")}>Kick</button>
            <button onClick={() => handleUserAbilities("block")}>Block</button>
            <button onClick={() => handleUserAbilities("special")}>Special Attack</button>
        </div>
    );
}

export default BattleMenu;
