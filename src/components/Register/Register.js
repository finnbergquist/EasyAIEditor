import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitUser } from '../../api/api';

function RegistrationPage({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()

    const user = {
        email,
        password,
        data : {
            forms: [],
            name
        }
    }
    const response = await submitUser(user)

    if (response?.isAuthenticated) {//Change this to check if the response is successful
      setUser(response.form);
      navigate('/dashboard');
    } else {
        // Handle failed registration here (e.g., show error message to user)
        console.log('Error:', response);
    }
  };

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
                className="block p-3 w-full border border-gray-300 rounded-md"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                pattern="\S+.*"
                title="This field is required"
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
                className="block p-3 w-full border border-gray-300 rounded-md"
                placeholder="john.doe@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                pattern="\S+@\S+\.\S+"
                title="This field is required and must be a valid email address"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                name="password"
                id="password"
                className="block p-3 w-full border border-gray-300 rounded-md"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                pattern="\S+.*"
                title="This field is required"
                />
            </div>

            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Account
            </button>
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
      </div>
    </main>
  );
}

export default RegistrationPage;