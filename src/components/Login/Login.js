import React, { useState } from 'react';
import { authenticateUser, getUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Login({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await authenticateUser(email, password);

    if (response.isAuthenticated) {
      setUser(response.user);
      navigate('/dashboard');
    } else {
      setError(response.error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Welcome Back!
        </h1>

        {/* Google Login */}
        <button aria-label="Log in with Google" className="flex items-center justify-center p-3 rounded-md border border-gray-300 w-full mb-4 hover:bg-gray-50">
          <div className="mr-2" color="#DB4437" size={20} />
          Log in with Google
        </button>

        <div className="text-center my-6">
          OR
        </div>

        {/* Manual Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input 
                type="email" 
                id="email" 
                className="block p-3 w-full border border-gray-300 rounded-md" 
                placeholder="Enter your email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input 
                type="password" 
                id="password" 
                className="block p-3 w-full border border-gray-300 rounded-md" 
                placeholder="Enter your password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          New to the platform?{" "}
          <span 
            onClick={() => navigate('/register')} 
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Create a new account
          </span>
          .
        </div>
      </div>
    </main>
  );
}

export default Login;