import React, { useState } from 'react';
import Navbar from '../../components/Navbar.jsx/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import loginImage from '../../assets/images/login.svg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");
    
    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Image Section */}
          <div className="hidden md:block w-1/2">
            <img 
              src={loginImage} 
              alt="Login" 
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">Login to همّة - Himma</h2>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-600">
                Not registered yet?{" "}
                <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;