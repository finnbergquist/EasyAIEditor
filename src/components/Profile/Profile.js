import { Home, FilePlus, LogOut, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                className="flex items-center justify-center p-2 text-xl font-semibold transition duration-200 ease-in-out hover:bg-gray-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="User menu" >
                <User />
            </button>
            {isOpen && (
                <div
                className="absolute right-0 w-48 mt-2 py-2 bg-white shadow-xl rounded-md border border-gray-100"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user menu options" >
                <Link to="/dashboard" className="flex items-center p-2 hover:bg-gray-200 rounded-md">
                  <Home className="mr-3" /> Dashboard
                </Link>
              
                <Link to="/login" className="flex items-center p-2 hover:bg-gray-200 rounded-md">
                  <LogOut className="mr-3" /> Logout
                </Link>
              </div>
            )}
        </div>
    );
}
export default Profile;