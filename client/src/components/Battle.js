import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import BattleMenu from './BattleMenu';
import '../styling/battle.css';
import { UserContext } from '../context/user';

function Battle({ history }) {
    const location = useLocation();
    const { userFighter, cpuFighter } = location.state;
    const { user } = useContext(UserContext);

    const [userHP, setUserHP] = useState(userFighter.hp);
    const [cpuHP, setCpuHP] = useState(cpuFighter.hp);
    const [matchId, setMatchId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [turns, setTurns] = useState(0);
    const [specialAttackCooldown, setSpecialAttackCooldown] = useState(false);
    const [cpuSpecialAttackCooldown, setCpuSpecialAttackCooldown] = useState(true);
    const [matchOutcome, setMatchOutcome] = useState(null);
    const [currentTurn, setCurrentTurn] = useState('user');

    const payload = {
        user_id: user.id,
        fighter1_id: userFighter.id,
        fighter2_id: cpuFighter.id,
    };
    // console.log(payload);

    useEffect(() => {
        console.log("match created")
        handleMatchCreation();
    }, []);

    useEffect(() => {
        if (currentTurn === 'user') {
            handleDelayedCPUAttack();
        }
    }, [currentTurn]);

    useEffect(() => {
        const storedMatchData = JSON.parse(localStorage.getItem('currentMatchData'));
        if (storedMatchData) {
            setUserHP(storedMatchData.userHP);
            setCpuHP(storedMatchData.cpuHP);
            setMessages(storedMatchData.messages);
            setTurns(storedMatchData.turns);
            setMatchOutcome(storedMatchData.matchOutcome);
            setCurrentTurn(storedMatchData.currentTurn);
        }
    }, []);

    const handleUserWin = () => {
        setMatchOutcome(true);
        handleUpdateMatchOutcome(true);
    };

    const handleUserLoss = () => {
        setMatchOutcome(false);
        handleUpdateMatchOutcome(false);
    };

    const getRandomMessage = (messages) => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    };

    const handleCPUAttack = () => {
        const userAttackPower = userFighter.ap;
        const cpuAttackPower = cpuFighter.ap;

        const cpuAction = getRandomAction();

        let message;
        let newUserHP = userHP;

        if (cpuAction === 'punch') {
            newUserHP -= cpuAttackPower;
            message = `CPU threw a punch at you!`;
        } else if (cpuAction === 'kick') {
            const reducedDamage = userAttackPower * 0.25;
            newUserHP = Math.max(0, userHP - reducedDamage);
            message = `CPU kicked you, but you blocked some damage.`;
        } else if (cpuAction === 'block') {
            message = `CPU is on the defensive and blocked your attack.`;
        } else if (cpuAction === 'special' && !cpuSpecialAttackCooldown) {
            const damage = cpuAttackPower * 1.65;
            newUserHP = Math.max(0, userHP - damage);
            message = `CPU used a special attack on you!`;
        }

        setMessages([...messages, message]);
        setUserHP(newUserHP);

        if (newUserHP <= 0) {
            handleUserLoss();
        }
        setCpuSpecialAttackCooldown(true);

        if (turns >= 3) {
            setCpuSpecialAttackCooldown(false);
        }

        handleDelayedCPUAttack();
    };

    const handleDelayedCPUAttack = () => {
        setTimeout(() => {
            handleCPUAttack();
        }, 2000);
    };

    const getRandomAction = () => {
        const actions = ['punch', 'kick', 'block', 'special'];
        const randomIndex = Math.floor(Math.random() * actions.length);
        return actions[randomIndex];
    };

    const handleUserAbilities = (abilityType) => {
        if (specialAttackCooldown && abilityType === 'special') {
            setMessages([...messages, 'Special attack is on cooldown. Choose another ability.']);
            return;
        }
    
        const userAttackPower = userFighter.ap;
        const cpuAttackPower = cpuFighter.ap;
    
        let newUserHP = userHP;
        let newCpuHP = cpuHP;
        let message = '';
    
        const cpuAction = getRandomAction();
    
        if (abilityType === 'punch') {
            message = getRandomMessage([
                "You threw a punch and got 'em good!",
                "You hit 'em so hard they don't know what hit 'em!",
                "Blistering right hook!",
            ]);
    
            if (cpuAction === 'block') {
                message = "You threw a punch but they blocked it.";
            } else if (cpuAction === 'kick') {
                newCpuHP -= userAttackPower * 0.25;
                message = "They blocked your punch, but still took some damage.";
            } else if (cpuAction === 'special' && !cpuSpecialAttackCooldown) {
                newCpuHP -= userAttackPower * 1.65;
                message = "They couldn't defend against your special punch!";
            } else {
                newCpuHP -= userAttackPower;
            }
        } else if (abilityType === 'kick') {
            message = getRandomMessage([
                "You hit 'em so hard they don't know what hit 'em!",
                "Clean hit!",
                "I think that wobbled 'em!",
            ]);
    
            if (cpuAction === 'block') {
                newCpuHP -= userAttackPower * 0.25;
                message = "They blocked your kick, but still took some damage.";
            } else if (cpuAction === 'punch') {
                message = "You kicked and they punched at the same time.";
            } else if (cpuAction === 'special' && !cpuSpecialAttackCooldown) {
                newCpuHP -= userAttackPower * 1.65;
                message = "They couldn't defend against your special kick!";
            } else {
                newCpuHP -= userAttackPower;
            }
        } else if (abilityType === 'block') {
            message = 'Nice defense!';
    
            if (cpuAction === 'punch') {
                newUserHP -= cpuAttackPower * 0.25;
                message = "They punched, but you blocked and took less damage.";
            } else if (cpuAction === 'kick') {
                newUserHP -= cpuAttackPower;
                message = "They tried to kick, but you blocked it.";
            }
        } else if (abilityType === 'special') {
            newUserHP -= 1.65 * cpuAttackPower;
            newCpuHP -= 1.65 * userAttackPower;
            message = "They're not getting up after that!";
    
            setSpecialAttackCooldown(true);
            setTurns(turns + 1);
    
            setTimeout(() => {
                setSpecialAttackCooldown(false);
            }, 3 * 3000);
        }
    
        setMessages([...messages, message]);
        setUserHP(newUserHP);
        setCpuHP(newCpuHP);
    
        if (newCpuHP <= 0) {
            handleUserWin();
        } else if (newUserHP <= 0) {
            handleUserLoss();
        }
    
        if (newCpuHP > 0 && newUserHP > 0) {
            handleDelayedCPUAttack();
        }

        if (currentTurn !== 'user') {
            return;
        }
    };
    
    const handleMatchCreation = () => {
        fetch('/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            setMatchId(data.match_id);
        })
        .catch(error => {
            console.error('Error creating match:', error);
        });
    };

    const handleUpdateMatchOutcome = (isUserWinner) => {
        fetch(`/matches/${matchId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                win_loss: isUserWinner,
            }),
        })
        .then(response => response.json())
        .then(data => {
            history.push('/match-history');
        })
        .catch(error => {
            console.error('Error updating match outcome:', error);
        });
    };

    return (
        <div>
            <h1>Battle</h1>
            <div className="fighters-arena">
                <div className="fighter">
                    <h2>{userFighter.name}</h2>
                    <img src={userFighter.image_strip} alt={userFighter.name} />
                    <div className="hp-bar">
                        <div
                            className="hp-fill"
                            style={{ width: `${(userHP / userFighter.hp) * 100}%` }}
                        />
                    </div>
                    <p>HP: {userHP}</p>
                </div>
                <div className="fighter">
                    <h2>{cpuFighter.name}</h2>
                    <img src={cpuFighter.image_strip} alt={cpuFighter.name} />
                    <div className="hp-bar">
                        <div
                            className="hp-fill"
                            style={{ width: `${(cpuHP / cpuFighter.hp) * 100}%` }}
                        />
                    </div>
                    <p>HP: {cpuHP}</p>
                </div>
            </div>
            <BattleMenu onAbility={handleUserAbilities} />
            {matchOutcome !== null && (
                <div>
                    {matchOutcome ? <p>You won the match!</p> : <p>You lost the match.</p>}
                    <button onClick={handleUpdateMatchOutcome}>End Match</button>
                </div>
            )}
            <div className="battle-messages-container">
                <h2>Battle Messages</h2>
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
