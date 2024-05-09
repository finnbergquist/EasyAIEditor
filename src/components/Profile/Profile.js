import { Home, FilePlus, LogOut } from "lucide-react";
import React, { useState } from "react";
function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-xl font-semibold"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="User menu" >
        A
      </button>
      {isOpen && (
        <div
          className="absolute right-0 w-48 mt-2 py-2 bg-white shadow-xl rounded-md border border-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user menu options" >
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-100 rounded-md"
            role="menuitem" >
            <Home className="mr-3" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-100 rounded-md"
            role="menuitem" >
            <FilePlus className="mr-3" /> New Design
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-100 rounded-md"
            role="menuitem" >
            <LogOut className="mr-3" /> Logout
          </a>
        </div>
      )}
    </div>
  );
}
export default Profile;
