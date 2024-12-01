import React, { useState } from 'react';
import { FaGithub, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';  // Adjust the path as needed


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('/login', {
        username,
        password,
        keepLoggedIn
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Debug the response
      console.log('Response data:', response.data);
  
      // Extract role safely
      const role = response.data?.role?.toUpperCase?.();
  
      // Store user info in session storage
      sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('role', role);
  
      // Navigate based on role
      switch (role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'USER':
          navigate('/user/dashboard');
          break;
        default:
          setError('Invalid role or response. Please contact support.');
      }
    } catch (err) {
      console.error('Login error:', err);
  
      if (err.response) {
        setError(err.response.data?.message || 'Invalid credentials');
      } else if (err.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] flex justify-center items-center p-4">
      <div className="container mx-auto flex bg-[#3b3b3b] rounded-xl overflow-hidden shadow-xl max-w-4xl animate-fadeIn">
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-10 bg-opacity-10 backdrop-blur-lg text-white">
          <h1 className="text-3xl font-bold text-center mb-3">Welcome back</h1>
          <h3 className="text-xl text-center mb-4">LOGIN PAGE</h3>
          <p className="text-center mb-6">Please Enter your Account details</p>

          {error && (
            <div className="bg-red-600 text-white p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Username</label>
              <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#282828] rounded-full border-2 border-transparent focus:border-[#29ffdf] focus:outline-none focus:ring-2 focus:ring-[#29ffdf] text-white"
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#282828] rounded-full border-2 border-transparent focus:border-[#29ffdf] focus:outline-none focus:ring-2 focus:ring-[#29ffdf] text-white"
                required 
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="keep-logged-in"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="keep-logged-in" className="text-sm">Keep me logged in</label>
              </div>
              <Link to="/forgot-password" className="text-[#ff758c] hover:text-[#ff5a70]">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-[#ff758c] rounded-full text-white font-bold hover:bg-[#ff5a70] transition duration-300 transform hover:-translate-y-1"
            >
              Log in
            </button>

            <div className="text-center mt-6">
              <p className="mb-4">Or login with:</p>
              <div className="flex justify-center space-x-6">
                <a href="/oauth2/authorization/github" className="text-white hover:text-[#ff758c] text-2xl">
                  <FaGithub />
                </a>
                <a href="/oauth2/authorization/facebook" className="text-white hover:text-[#ff758c] text-2xl">
                  <FaFacebook />
                </a>
                <a href="/oauth2/authorization/gmail" className="text-white hover:text-[#ff758c] text-2xl">
                  <FaGoogle />
                </a>
              </div>
            </div>
          </form>

          <div className="text-center mt-6">
            <p>
              <Link to="/register" className="text-[#ff758c] hover:text-[#ff5a70]">
                New member? Register here
              </Link>
            </p>
            <p className="mt-4">
              <Link to="/" className="text-[#ff758c] hover:text-[#ff5a70]">
                Back to Landing Page
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden group">
          <div className="absolute inset-0">
            <img 
              src="/images/bal_image.jpeg" 
              alt="Basketball Africa League" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;