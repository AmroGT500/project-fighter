import React, { useState, useContext} from 'react';
import '../styling/profile.css';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState('');
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const history = useHistory();
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

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
      console.log(response);
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
        history.push('/authentication');
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  
  
  return (
    <div className='profile-wrapper'>
      <div className='profile-container'>
        <h1 className='profile-title'>
          <span className='neon-effect'>Welcome to PROJECT FIGHTER</span><br />
          <span className='username-effect'>{user.username}</span>
        </h1>
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
