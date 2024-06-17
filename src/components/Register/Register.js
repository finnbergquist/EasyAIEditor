import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitUser, authenticateUser, verifyUser } from '../../api/api';

function RegistrationPage({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [error , setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setError('')
    event.preventDefault()
    setLoading(true);

    const user = {
        email,
        password,
        data : {
            forms: [],
            name,
            freeAPIRequests: 2,
        }
    }
    const response = await submitUser(user);
    setLoading(false);
    if (response.success ){
        setCodeSent(true);
    } else {
        setError(response.error);
    }
  };

  const handleSendCode = async (event) => {
    setError('')
    setLoading(true);
    event.preventDefault();
    const response = await verifyUser(email);
    setLoading(false);
    if (!response.error) {
      setCodeSent(true);
    } else {
      console.log(response.error);
    }
  };

  const handleAuthenticate = async (event) => {
    setError('')
    event.preventDefault();
    const response = await authenticateUser(email, password, verificationCode);
    if (response.isAuthenticated) {
      setUser(response.user);
      navigate('/dashboard');
    } else {
      setError(response.error);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
                </label>
                <input
                type="text"
                name="name"
                id="name"
                className={`block p-3 w-full border border-gray-300 rounded-md ${codeSent ? 'bg-gray-200' : ''}`}
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                pattern="\S+.*"
                title="This field is required"
                disabled={codeSent}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                name="email"
                id="email"
                className={`block p-3 w-full border border-gray-300 rounded-md ${codeSent ? 'bg-gray-200' : ''}`}
                placeholder="john.doe@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={codeSent}
                required
                pattern="\S+@\S+\.\S+"
                title="This field is required and must be a valid email address"
                />
                <p className="mt-2 text-sm text-gray-600 text-center">We'll send you a verification code</p>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                name="password"
                id="password"
                className={`block p-3 w-full border border-gray-300 rounded-md ${codeSent ? 'bg-gray-200' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={codeSent}
                pattern="\S+.*"
                title="This field is required"
                />
            </div>

            {error && (
              <div className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p>{error}</p>
              </div>
            )}

            {codeSent && (
              <div>
                <p className="my-4 text-sm text-gray-600 text-center">Code sent to {email}</p>
                <div className="mb-4">
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
                  name="code"
                  id="code"
                  className="block p-3 w-full border border-gray-300 rounded-md"
                  placeholder="Enter the code"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  required
                />
                </div>

                <button
                  className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleAuthenticate}
                >
                  Login
                </button>

              </div>
            )}



            {!codeSent && (
              <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Next
              </button>
            )}

        </form>

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span 
            onClick={() => navigate('/login')} 
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign in
          </span>
          .
        </div>

        {loading && <Loader className="animate-spin mt-2 h-5 w-5 ml-3" />}
      </div>
    </main>
  );
}

export default RegistrationPage;