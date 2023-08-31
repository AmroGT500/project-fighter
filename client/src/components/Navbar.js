import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styling/navbar.css';
import { UserContext } from '../context/user';



const Navbar = () => {
  const history = useHistory();
  const [menuChecked, setMenuChecked] = useState(false);

  const { setUser }=useContext(UserContext);

  const handleSignOut = () => {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => {
      setUser(null)
      window.confirm('Logged out successfully')
    })
    history.push('/authentication');
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
            <Link to={`/profile`} onClick={handleLinkClick}>
              Profile
            </Link>
          </li>
          <li>
            <Link to={`/fight-setup`} onClick={handleLinkClick}>
              Fight Now!
            </Link>
          </li>
          <li>
            <Link to={`/match-history`} onClick={handleLinkClick}>
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
