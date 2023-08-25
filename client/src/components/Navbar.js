import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuChecked, setMenuChecked] = useState(false);

  const handleSignOut = () => {
    navigate('/authentication');
  };

  const handleLinkClick = () => {
    setMenuChecked(false);
  };

  return (
    <nav className="navbar">
      <input
        type="checkbox"
        id="active"
        checked={menuChecked}
        onChange={() => setMenuChecked(!menuChecked)}
      />
      <label htmlFor="active" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <div className="wrapper">
        <ul>
          <li>
            <Link to="/profile/:userId" onClick={handleLinkClick}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/fight-setup/:userId" onClick={handleLinkClick}>
              Fight Now!
            </Link>
          </li>
          <li>
            <Link to="/match-history/:userId" onClick={handleLinkClick}>
              Match History
            </Link>
          </li>
          <li className='navbar-signout'>
            <button className='signout-button' onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
