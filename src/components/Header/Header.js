import React from 'react';
import { Home } from 'lucide-react';
import Profile from '../Profile/Profile';
import { Link } from 'react-router-dom';


function Header({user, setUser}) {
  return (
    <header className="flex justify-between items-center p-2 ">
      <div className = "flex items-center justify-center p-2 text-xl font-semibold transition duration-200 ease-in-out hover:bg-gray-200">
        <Link to="/dashboard">
          <Home className="text-2xl" />
        </Link>
      </div>
      <Profile />
    </header>
  );
}

export default Header;