import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BattleMenu from './BattleMenu';
import '../styling/battle.css';
import { UserContext } from '../context/user';

const blockModifiers = {
    kick: 0.25,
    punch: 0
}

const getRandom = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

// attacker: { name, ap, hp, cd, ability }
const handleAttack = (attacker, defender) => {
    console.log('handle', attacker, defender)

    console.log(attacker.ability)

    if (attacker.ability === 'block') {
        return [defender.hp, `${attacker.name} blocked`];
    }
    if (defender.ability === 'block') {

        if (attacker.ability === 'special') {
            return [defender.hp - attacker.ap * 1.65, `${attacker.name} used special attack and ignored ${defender.name}'s block`]
        }
        return [defender.hp - attacker.ap * blockModifiers[attacker.ability], `${attacker.name} ${attacker.ability}ed, but ${defender.name} blocked and took less damage`];
    }

    if (attacker.ability === 'special') {
        return [defender.hp - attacker.ap * 1.65, `${attacker.name} used special attack`]
    }

    return [defender.hp - attacker.ap, `${attacker.name} ${attacker.ability}ed`]
}

function Battle() {
    const location = useLocation();
    const navigate = useNavigate();

    const { userFighter, cpuFighter } = location?.state || {};

    const [userHP, setUserHP] = useState(userFighter?.hp);
    const [cpuHP, setCpuHP] = useState(cpuFighter?.hp);
    const [messages, setMessages] = useState([]);

    const [turn, setTurn] = useState(0);
    const [specialAttackCooldown, setSpecialAttackCooldown] = useState(3);
    const [cpuSpecialAttackCooldown, setCpuSpecialAttackCooldown] = useState(0);

    const [matchOutcome, setMatchOutcome] = useState(null);

    const { user } = useContext(UserContext);
    if (!user) {
        console.error('User not available');
        return null;
    }

    if (!location?.state) {
        navigate('/fight-setup')
        return;
    }

    const handleAttacks = (ability) => {
        let userCd = specialAttackCooldown
        let cpuCd = cpuSpecialAttackCooldown
        let cpuAbility = getRandom(['kick', 'punch', 'block', 'special'])
        let newMessages = [...messages, `=============== TURN ${turn + 1} ===============`]

        while (cpuAbility === 'special' && cpuCd > 0) {
            cpuAbility = getRandom(['kick', 'punch', 'block', 'special'])
        }

        console.log('you have')

        if (userCd > 0 && ability === 'special') {
            setMessages([...newMessages, 'special attack is on cooldown use a different attack'])
            return;
        }

        const [cpuHealth, cpuMessage] = handleAttack({
            name: userFighter.name,
            ap: userFighter.ap,
            hp: userHP,
            cd: userCd,
            ability
        }, {
            name: cpuFighter.name,
            ap: cpuFighter.ap,
            hp: cpuHP,
            cd: cpuCd,
            ability: cpuAbility
        })

        const [playerHealth, playerMessage] = handleAttack({
            name: cpuFighter.name,
            ap: cpuFighter.ap,
            hp: cpuHP,
            cd: cpuCd,
            ability: cpuAbility
        }, {
            name: userFighter.name,
            ap: userFighter.ap,
            hp: userHP,
            cd: userCd,
            ability
        })

        if (cpuAbility === 'special') {
            cpuCd = 4
        }

        if (ability === 'special') {
            userCd = 4
        }

        cpuCd = cpuCd > 0 ? cpuCd - 1: 0
        userCd = userCd > 0 ? userCd - 1: 0

        
        setCpuSpecialAttackCooldown(cpuCd)
        setSpecialAttackCooldown(userCd)

        setCpuHP(cpuHealth)
        setUserHP(playerHealth)
        newMessages = [...newMessages, cpuMessage, playerMessage]
        setTurn(turn + 1)

        if (playerHealth <= 0 || cpuHealth <= 0) {
            if (playerHealth <= 0) {
                newMessages = [...newMessages, 'You Lose!']
                setMatchOutcome(false)
            } else {
                newMessages = [...newMessages, 'You Win!']
                setMatchOutcome(true)
            }
        }
        setMessages(newMessages)
    }

    const handleUpdateMatchOutcome = () => {
        fetch(`/matches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user.id,
                fighter1_id: userFighter.id,
                fighter2_id: cpuFighter.id,
                win_loss: matchOutcome,
            }),
        })
            .then(response => response.json())
            .then(() => {
                navigate('/match-history');
            })
            .catch(error => {
                console.error('Error updating match outcome:', error);
            });
    };

    return (
        <div className="battle-wrapper">
            <h1 className='battle-title'>
                <span className='neon-effect'>FIGHT!</span></h1>
            <div className="fighters-arena">
                <div className="user-fighter">
                    <h2>{userFighter.name}</h2>
                    <img src={userFighter.image_strip} alt={userFighter.name} />
                    <div className="hp-bar">
                        <div
                            className="user-hp-fill"
                            style={{ width: `${(userHP / userFighter.hp) * 100}%` }}
                        />
                    </div>
                    <p>HP: {userHP}</p>
                    <p>Special Cooldown: {specialAttackCooldown > 0 ? `${specialAttackCooldown} Turns` : 'Available!'}</p>
                </div>
                <div className="cpu-fighter">
                    <h2>{cpuFighter.name}</h2>
                    <img src={cpuFighter.image_strip} alt={cpuFighter.name} />
                    <div className="hp-bar">
                        <div
                            className="cpu-hp-fill"
                            style={{ width: `${(cpuHP / cpuFighter.hp) * 100}%` }}
                        />
                    </div>
                    <p>HP: {cpuHP}</p>
                    <p>Special Cooldown: {cpuSpecialAttackCooldown > 0 ? `${cpuSpecialAttackCooldown} Turns` : 'Available!'}</p>
                </div>
            </div>
            {matchOutcome === null && <BattleMenu onAbility={handleAttacks} />}
            {matchOutcome !== null && (
                <div className='end-message'>
                    {matchOutcome ? <p>You won the match!</p> : <p>You lost the match.</p>}
                    <button className='end-button' onClick={handleUpdateMatchOutcome}>End Match</button>
                </div>
            )}
            <div className="battle-messages-container">
                <h2>Battle Log</h2>
                <ul className="battle-messages">
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Battle;
