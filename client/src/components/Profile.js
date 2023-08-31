import React, { useState, useContext, useEffect, useMemo } from 'react';
import '../styling/profile.css';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState('');
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [typedUsername, setTypedUsername] = useState('');
  const [fighters, setFighters] = useState([]);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

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


  console.log(fighters)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch(`/matches/${user.id}`);
        if (response.ok) {
          const matches = await response.json();
          setMatches(matches || []);
        } else {
          console.error('Failed to fetch fighter data');
        }
      } catch (error) {
        console.error('Error fetching fighter data:', error);
      }
    }

    fetchMatches();
  }, [user]);

  useEffect(() => {
    console.log('typed useeffect', user)
    let username = user?.username || ''
    let currentIndex = 0;
    setTypedUsername('');
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
  }, [user]);

  const recentMatches = useMemo(() => {
    return matches?.slice(0,3) || []
  }, [matches])

  console.log('user', user)

  console.log('recentMatches', recentMatches)

  if(!user) {
    return null;
  }

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

  const handleDeleteAccount = async () => {
    setShowDeletePrompt(false);

    try {
      const response = await fetch(`/users/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUser(null);
        navigate('/authentication');
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  
  function wins() {
    if (matches) {
      return matches.filter(match => match.win_loss).length;
    }
    return 0; 
  }
  
  function losses() {
    if (matches) {
      return matches.filter(match => !match.win_loss).length;
    }
    return 0; 
  }
  
  function winrate() {
    if (matches) {
      const totalMatches = matches.length;
  
      if (totalMatches === 0) {
        return 'No matches recorded';
      }
  
      const totalWins = wins();
      return (totalWins / totalMatches * 100).toFixed(2) + '%';
    } else {
      return 'No matches recorded';
    }
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
          {recentMatches.reverse().map(match => {
            console.log('match', match);
            const fighterInfo1 = fighters.find(fighter => fighter.id === match.fighter1_id);
            // const fighterInfo2 = fighters.find(fighter => fighter.id === match.fighter2_id);
            return (
              <div key={match.id} className='recent-fighter-list'>
                <div className='recent-fighter-image'>
                  <img src={fighterInfo1?.image} alt={fighterInfo1?.name} />
                </div>
                {/* <div className='recent-fighter-image'>
                  <img src={fighterInfo2?.image} alt={fighterInfo2?.name} />
                </div> */}
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
          <div className='toggle-delete'>
            <button className='toggle-button' onClick={() => setShowDeletePrompt(true)}>Delete Account</button>
            {showDeletePrompt && (
              <div className='profile-section'>
                <p className='delete-prompt-message'>Are you sure you want to delete your account?</p>
                <div className='delete-prompt-buttons'>
                  <button className='confirm-button' onClick={handleDeleteAccount}>Confirm</button>
                  <button className='cancel-button' onClick={() => setShowDeletePrompt(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Profile;
