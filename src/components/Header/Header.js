import React from 'react';
import Profile from '../Profile/Profile';
import { Link } from 'react-router-dom';
import headerLogo from './headerLogo.png'; // Adjust the path as necessary




function Header({user, setUser}) {
  return (
    <header className="flex justify-between items-center p-2 ">
      <div className = "flex items-center justify-center p-2 text-xl font-semibold transition duration-200 ease-in-out hover:bg-gray-200">
        <Link to="/dashboard">
        <img src={headerLogo} alt="Website Logo" style={{ height: '50px' }} className="header-logo" />
        </Link>
      </div>
      <Profile
        user = {user}
        setUser={setUser} />
    </header>
  );
}

export default Header;