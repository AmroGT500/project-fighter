// import React, { useEffect } from 'react';
// import { useBattleContext } from './BattleContext';

// function Battle() {
//   const { player1, setPlayer1, player2, setPlayer2 } = useBattleContext();

//   const performAttack = (attacker, defender, isSuperAttack) => {
//     const damage = isSuperAttack ? Math.ceil(attacker.ap * 1.667) : attacker.ap;
//     defender.hp -= damage;

//     if (isSuperAttack) {
//       attacker.superAttackCooldown = 3;
//       attacker.attackCount = 0;
//     } else {
//       attacker.attackCount += 1;
//       if (attacker.attackCount >= 3) {
//         // Enable super attack button
//       }
//     }

//     // Check if defender is defeated
//     if (defender.hp <= 0) {
//       // Display victory/defeat message
//     }

//     // Update state
//     if (attacker === player1) {
//       setPlayer1({ ...attacker });
//       setPlayer2({ ...defender });
//     } else {
//       setPlayer1({ ...defender });
//       setPlayer2({ ...attacker });
//     }

//     // Switch turns
//     // Update UI elements
//   };

//   const handleAttack = (attacker, defender, isSuperAttack) => {
//     performAttack(attacker, defender, isSuperAttack);
//     // Switch turns
//   };

//   return (
//     <div className="battle-container">
//       <button onClick={() => handleAttack(player1, player2, false)}>Punch</button>
//       <button onClick={() => handleAttack(player1, player2, false)}>Kick</button>
//       <button onClick={() => handleAttack(player1, player2, true)} disabled={player1.attackCount < 3}>Super Attack</button>
//     </div>
//   );
// }

// export default Battle;
