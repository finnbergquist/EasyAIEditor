import { Home, Layers, LogOut, User, Eye, EyeOff } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { updateUser } from "../../api/api";
import { Link, useNavigate } from 'react-router-dom';

function Profile({user, setUser}) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showAPIKey, setShowAPIKey] = useState(false);
    const [isEditingKey, setIsEditingKey] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAPIKeyChange = (e) => {
      setIsEditingKey(true)
      setUser({
        ...user,
        data: {
          ...user.data,
          openAPIKey: e.target.value
        }
      });
    }

    const handleSave = async () => {
      try {
        const updatedUser = await updateUser(user);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditingKey(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error:', error);
        }
      }
    };

    return (
        <div className="relative">
            <div className="grid grid-flow-col auto-cols-max items-center gap-2">
              <div className="items-center">
                {user?.data?.freeAPIRequests}
              </div>
              <div className="items-center">
                  <Layers size="18"/>
              </div>
              <button
                  className="items-center justify-center w-10 h-10 text-lg font-medium transition duration-200 ease-in-out bg-gray-200 hover:bg-gray-400 rounded-full p-2"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  aria-label="User menu" >
                  {user?.data?.name ? (
                      <span className="flex items-center">
                          {user?.data?.name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase()}
                      </span>) : (<User />)
                  }
              </button>
            </div>
            {isOpen && (
                <div
                ref={dropdownRef}
                className="absolute right-0 w-64 mt-4 py-2 bg-white shadow-xl rounded-md border border-gray-100"
                role="menu"
                style={{ zIndex: 1000 }}
                aria-orientation="vertical"
                aria-labelledby="user menu options" >
                <div className="p-2 flex items-center">
                  <input
                    type={showAPIKey ? "text" : "password"}
                    placeholder="Enter OpenAI API Key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={user.data?.openAPIKey}
                    onChange={handleAPIKeyChange}
                  />
                  {!isEditingKey && (
                    <button 
                      className="ml-2"
                      onClick={() => setShowAPIKey(!showAPIKey)}
                      aria-label="Toggle API Key visibility">
                      {showAPIKey ? <EyeOff /> : <Eye />}
                    </button>
                  )}
                  {isEditingKey && (
                    <button 
                      className="ml-2 border border-gray-300 hover:bg-gray-200 px-3 py-2 rounded-md"
                      onClick={handleSave}
                      aria-label="Save API Key">
                      Save
                    </button>
                  )}
                </div>
                
                <Link to="/dashboard" className="flex items-center p-2 hover:bg-gray-200 rounded-md">
                  <Home className="mr-3" /> Dashboard
                </Link>
              
                <Link 
                  to="/login" 
                  className="flex items-center p-2 hover:bg-gray-200 rounded-md"
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                  }}
                >
                  <LogOut className="mr-3" /> Logout
                </Link>
                
              </div>
            )}
        </div>
    );
}

export default Profile;
