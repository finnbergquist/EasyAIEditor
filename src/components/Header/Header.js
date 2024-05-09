import React from 'react';
import { Home } from 'lucide-react';
import Profile from '../Profile/Profile';
import { Link } from 'react-router-dom';


function Header({user, setUser}) {
  return (
    <header className="flex justify-between items-center p-4 ">
      <Link to="/dashboard">
        <Home className="text-2xl" />
      </Link>
      <Profile />
    </header>
  );
}

export default Header;