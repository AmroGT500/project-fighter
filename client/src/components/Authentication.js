import React, { useState, useContext } from 'react';
import '../styling/authentication.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';


const Authentication = () => {
  const {setUser,} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [,setLoggedIn] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();



  const handleModeToggle = () => {
    setIsSignupMode(!isSignupMode);
    setErrorMessage('');
    setSignupSuccess(false);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setLoggedIn(true);
        setUser(data)
        navigate(`/profile`);
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async () => {
    if (username.length < 5 || password.length < 5) {
      setErrorMessage('Username and password must be at least 5 characters.');
      return;
    }
  
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: password }), 
      });
  
      if (response.status === 201) {
        setSignupSuccess(true);
        setErrorMessage('');
      } else if (response.status === 409) {
        setErrorMessage('Username already exists. Please choose a different username.');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };


  return (
    <div className="container">
      <div className="title-container">
        <h1 className="auth-title">PROJECT FIGHTER</h1>
      </div>
      <div className={`authentication-container ${isSignupMode ? 'signup-mode' : 'login-mode'}`}>
        <h2 className='toggle-title'>{isSignupMode ? 'Register' : 'Login'}</h2>
        <div className="input-container">
          <label className="input-label">Username</label>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="input-label">Password</label>
          <input className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {signupSuccess && (
          <div className="signup-success-popup">
            Signed up successfully! Please log in.
          </div>
        )}
        {isSignupMode ? (
          <button className="signup-button login-button" onClick={handleSignup}>
            Signup
          </button>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        )}
        <p>
          {isSignupMode ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="mode-toggle" onClick={handleModeToggle}>
            {isSignupMode ? 'Login' : 'Signup'}
          </span>
        </p>
      </div>
    </div>
  );

};

export default Authentication;
