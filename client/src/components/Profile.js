import React, { useState, useContext, useEffect } from 'react';
import '../styling/profile.css';
import { UserContext } from '../context/user';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState('');
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [typedUsername, setTypedUsername] = useState('');
  const username = user.username;
  const [fighters, setFighters] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const matches = user && user.matches;

  useEffect(() => {
    async function fetchFighters() {
      try {
        const response = await fetch('/fighters');
        if (response.ok) {
          const fighters = await response.json();
          setFighters(fighters);
        } else {
          console.error('Failed to fetch fighter data');
        }
      } catch (error) {
        console.error('Error fetching fighter data:', error);
      }
    }

    fetchFighters();
  }, []);

  useEffect(() => {
    setRecentMatches(matches.slice(0, 3));
  }, [matches]);

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex === username.length) {
        clearInterval(typingInterval);
        return;
      }
      const currentChar = username[currentIndex];
      setTypedUsername(prevTyped => prevTyped + currentChar);

      currentIndex++;
    }, 300);

    return () => clearInterval(typingInterval);
  }, [username]);

  const handleUsernameChange = event => {
    setNewUsername(event.target.value);
  };

  const handleUpdateUsername = async () => {
    if (newUsername.trim() === '') return;

    try {
      const response = await fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        setUser(prevUser => ({ ...prevUser, username: newUsername }));
        setNewUsername('');
        setUsernameChanged(true);
        console.log('Username changed ');

        setTimeout(() => {
          setUsernameChanged(false);
        }, 3000);
      } else {
        console.error('Failed to update username');
      }
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const handlePasswordChange = event => {
    setNewPassword(event.target.value);
  };

  const handleUpdatePassword = async () => {
    if (newPassword.trim() === '') return;

    try {
      const response = await fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setNewPassword('');
        setPasswordChanged(true);
        console.log('Password changed ');

        setTimeout(() => {
          setPasswordChanged(false);
        }, 3000);
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating Password:', error);
    }
  };

  function wins() {
    return user.matches.filter(match => match.win_loss).length;
  }

  function losses() {
    return user.matches.filter(match => !match.win_loss).length;
  }

  function winrate() {
    const totalMatches = user.matches.length;

    if (totalMatches === 0) {
      return 'No matches recorded';
    }

    const totalWins = wins();
    return (totalWins / totalMatches * 100).toFixed(2) + '%';
  }

  return (
    <div className='profile-wrapper'>
      <div className='profile-container'>
        <h1 className='profile-title'>
          <span className='neon-effect'>Welcome to PROJECT FIGHTER</span><br />
          <span className='username-effect'>{typedUsername}</span>
        </h1>
        <div className='profile-info'>
          <p>Wins: {wins()}</p>
          <p>Losses: {losses()}</p>
          <p>Winrate: {winrate()}</p>
        </div>

          <div className='top-fighters'>
          <div className="top-fighters-header" colSpan="3">
          <h3>Recently Played Fighters</h3>
        </div>
          {recentMatches.slice(-3).reverse().map(match => {
            const fighterInfo1 = fighters.find(fighter => fighter.id === match.fighter1.id);
            return (
              <div key={match.id} className='recent-fighter-list'>
                <div className='recent-fighter-image'>
                  <img src={fighterInfo1?.image} alt={fighterInfo1?.name} />
                </div>
              </div>
            );
          })}
        </div>

      <div className='toggle-container'>
        <div className='toggle-username'>
          <button className='toggle-button' onClick={() => setShowChangeUsername(!showChangeUsername)}>Change Username</button>
          {showChangeUsername && (
            <div className='profile-section'>
              <h3>Change Username</h3>
              <input
                type='text'
                placeholder='New Username'
                value={newUsername}
                onChange={handleUsernameChange}
                className='custom-input'
              />
              <button className='update-button' onClick={handleUpdateUsername}>Update Username</button>
            </div>
          )}
          {usernameChanged && (
            <div className='popup-message'>Username changed successfully!</div>
          )}
        </div>
        <div className='toggle-password'>
          <button className='toggle-button' onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
          {showChangePassword && (
            <div className='profile-section'>
              <h3>Change Password</h3>
              <input
                type='password'
                placeholder='New Password'
                value={newPassword}
                onChange={handlePasswordChange}
                className='custom-input'
              />
              <button className='update-button' onClick={handleUpdatePassword}>Update Password</button>
            </div>
          )}
          {passwordChanged && (
            <div className='popup-message'>Password changed successfully!</div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
