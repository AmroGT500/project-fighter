import React, { useState, useContext } from 'react';
import '../styling/profile.css';
import { UserContext } from '../context/user';

function Profile() {
  const {user, setUser} = useContext(UserContext);
  const [newUsername, setNewUsername] = useState('');
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);


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
        console.log('Password changed ')
      } else {
        console.error('Failed to update Password');
      }
    } catch (error) {
      console.error('Error updating Password:', error);
    }
  };

  function wins() {
    return user.matches.filter(match => match.win_loss).length
  }
  function losses() {
    return user.matches.filter(match => !match.win_loss).length
  }
  function winrate() {
    return wins() / user.matches.length * 100
  }

  return (
    <div className='profile-wrapper'>
      <div className="profile-container">
        <h1 className="profile-title">Welcome to the Fight Club, {user.username}</h1>
        <div className="profile-info">
          <p>Wins: {wins()}</p>
          <p>Losses: {losses()}</p>
          <p>Winrate: {winrate()}%</p>
        </div>

        <div className="toggle-username">
          <button className="toggle-button" onClick={() => setShowChangeUsername(!showChangeUsername)}>Change Username</button>
          {showChangeUsername && (
            <div className="profile-section">
              <h3>Change Username</h3>
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={handleUsernameChange}
                className="custom-input"
              />
              <button className="update-button" onClick={handleUpdateUsername}>Update Username</button>
            </div>
          )}
        </div>

        <div className="toggle-password">
          <button className="toggle-button" onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
          {showChangePassword && (
            <div className="profile-section">
              <h3>Change Password</h3>
              <input
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChange={handlePasswordChange}
                className="custom-input"
              />
              <button className="update-button" onClick={handleUpdatePassword}>Update Password</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;
