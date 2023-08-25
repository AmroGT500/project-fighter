import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styling/profile.css';
import { fetchApi } from '../utils';

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  console.log('user id', userId)

  useEffect(() => {
    fetchUserData();
  }, [userId]);
  

  const fetchUserData = async () => {
    try {
      const response = await fetchApi(`/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("set data", data);
        setUserData(data);
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUsernameChange = event => {
    setNewUsername(event.target.value);
  };

  const handleUpdateUsername = async () => {
    if (newUsername.trim() === '') return;

    try {
      const response = await fetchApi(`/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        setUserData(prevUserData => ({ ...prevUserData, username: newUsername }));
        setNewUsername('');
      } else {
        console.error('Failed to update username');
      }
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };


  return (
    <div className='profile-wrapper'>
      <div className="profile-container">
        <h1 className="profile-title">Welcome to the Fight Club, {userData.username}</h1>
        <div className="profile-info">
          <p>Wins: {userData.wins}</p>
          <p>Losses: {userData.losses}</p>
          <p>Winrate: {userData.winrate}</p>
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
      </div>
    </div>
  );
}

export default Profile;
