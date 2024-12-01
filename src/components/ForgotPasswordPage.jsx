import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous messages
    setMessage('');
    setError('');

    // Validate email before proceeding
    if (!email.trim()) {
      setError('Email cannot be empty');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/forgot-password', 
        { email },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true 
        }
      );

      // Handle successful response
      setMessage('A reset link has been sent to your email.');
      setEmail(''); // Clear email input
    } catch (error) {
      // Handle error response
      if (error.response) {
        setError(error.response.data.error || 'Failed to send reset link. Please try again.');
      } else if (error.request) {
        setError('No response from server. Please check your network connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-pink flex justify-center items-center">
      <div className="container flex bg-custom-dark-bg rounded-xl overflow-hidden shadow-custom-login w-[900px] h-[600px]">
        <div className="forgot-password-box flex-1 p-10 bg-white/10 backdrop-blur-lg text-white">
          <h2 className="text-center text-3xl mb-5 text-custom-focus-border animate-fadeIn">
            Forgot Password
          </h2>
          
          <p className="text-center mb-5 animate-fadeIn">
            Please enter your email to receive a password reset link.
          </p>

          {/* Error Message */}
          {error && (
            <div className="text-center mb-5 text-red-500">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="text-center mb-5 text-green-400">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear any previous error when user starts typing
                if (error) setError('');
              }}
              placeholder="Email" 
              required
              className={`w-full p-4 bg-custom-input-bg border-2 rounded-xl 
                         text-white focus:border-custom-focus-border 
                         focus:ring-2 focus:ring-custom-focus-border/60 
                         mt-[100px]
                         ${error ? 'border-red-500' : 'border-transparent'}`}
            />
            
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full p-4 rounded-full 
                         text-white text-lg mt-3 
                         transition transform hover:-translate-y-1 
                         shadow-md hover:shadow-lg
                         ${isLoading 
                           ? 'bg-gray-500 cursor-not-allowed' 
                           : 'bg-custom-pink hover:bg-pink-600'
                         }`}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="text-center mt-7">
            <Link 
              to="/login" 
              className="text-custom-pink font-bold hover:text-pink-600 transition"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Right Side - Background Image */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/images/bal_image.jpeg" 
              alt="Basketball Africa League"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;