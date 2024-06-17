import React, { useState, useEffect } from 'react';
import { authenticateUser, submitForm, verifyUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react'


function Login({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('manual');//default login Type
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, []);

  const handleSendCode = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const response = await verifyUser(email);
    setLoading(false);
    if (!response.error) {
      setCodeSent(true);
    } else {
      console.log(response.error);
      setError(response.error);
    }
  };

  const changeLoginType = () => {
    if (loginType === 'manual') {
      setLoginType('temporary');
    } else {
      setLoginType('manual');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await authenticateUser(email, password, temporaryPassword);

    if (response?.isAuthenticated) {
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

        <button 
          aria-label="Log in with Temporary Access Code" 
          className="flex items-center justify-center p-3 rounded-md border border-gray-300 w-full mb-4 hover:bg-gray-50"
          onClick={changeLoginType}
        >
          {loginType === 'manual' ? (
            "Login with Temporary Access Code"
          ) : (
            "Login with Email and Password"
          )}

        </button>

        <div className="text-center my-6">
          OR
        </div>

        {loginType === 'manual' && (
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
        )} 

        {loginType === 'temporary' && (
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input 
                  type="email" 
                  id="email" 
                  className={`block p-3 w-full border border-gray-300 rounded-md ${codeSent ? 'bg-gray-200' : ''}`}
                  placeholder="Enter your email" 
                  disabled={codeSent}
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
            </div>
            {codeSent && (
              <div>
                <div className="mb-4">
                <p className="my-4 text-sm text-gray-600 text-center">Code sent to {email}</p>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="code" className="text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <span
                    onClick={handleSendCode}
                    className="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
                  >
                    Resend Code
                  </span>
                </div>
                  <input 
                    type="text" 
                    id="accessCode" 
                    className="block p-3 w-full border border-gray-300 rounded-md" 
                    placeholder="Enter your temporary access code" 
                    value={temporaryPassword}
                    onChange={e => setTemporaryPassword(e.target.value)}
                    required 
                  />
                </div>

                <p className="mb-4 text-green-500">
                {response}
                </p>

                {error && (
                  <div className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    <p>{error}</p>
                  </div>
                )}

                <button className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            )}
            {!codeSent && (
              <div>
                <button className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleSendCode}>
                  Send Temporary Access Code
                </button>
                {error && (
                  <div className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                    <p>{error}</p>
                  </div>
                )}
              </div>
            )}
          </form>
        )}

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
        {loading && <Loader className="animate-spin mt-2 h-5 w-5 ml-3" />}
      </div>
      
    </main>
  );
}

export default Login;