// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { UserContext } from '../context/user';

// function Battle() {
//     const location = useLocation();
//     const userFighter = location.state.userFighter;
//     const cpuFighter = location.state.cpuFighter;

//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     const [userHP, setUserHP] = useState(userFighter.hp);
//     const [cpuHP, setCpuHP] = useState(cpuFighter.hp);
//     const [userCooldown, setUserCooldown] = useState(0);
//     const [cpuCooldown, setCpuCooldown] = useState(0);
//     const [battleLog, setBattleLog] = useState([]);
//     const [battleOver, setBattleOver] = useState(false);

//     useEffect(() => {
//         // Implement the battle logic here

//         // Perform CPU attack

//         // Check for battle outcome

//     }, [userCooldown, userHP, cpuCooldown, cpuHP, userFighter.ap, cpuFighter.ap]);

//     const handleAttack = (attackType) => {
//         // Implement the attack logic 

//         // Update user and CPU HP

//         // Update battle log

//         // Handle battle outcome

//         // Reset cooldowns
//     };

//     const handleTryAgain = () => {
//         // Reset battle and create new instance of a match
//     };

//     const handleChooseNewFighter = () => {
//         // Navigate to fighter setup screen
//     };

//     const handleExit = () => {
//         // Navigate back to profile
//     };

//     return (
//         // battle UI 
//     )
// }

// export default Battle;
