import React from 'react';
import { Link } from 'react-router-dom';
import balImage from '../images/bal_image.jpeg'; // Adjust path as needed

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] flex justify-center items-center animate-gradient">
      <div className="container mx-auto bg-[#3b3b3b] rounded-lg overflow-hidden shadow-lg flex w-[900px] h-[500px]">
        <div className="access-denied-box flex-1 p-10 bg-white/10 backdrop-blur-md flex flex-col justify-center">
          <h1 className="text-center text-3xl font-bold text-[#ff758c] mb-4 animate-fadeInText">
            Access Denied
          </h1>
          <p className="text-center text-white mb-6 animate-fadeInText">
            You do not have permission to access this resource right now. You need to log in first.
          </p>
          <Link 
            to="/login" 
            className="block text-center py-4 bg-[#ff758c] rounded-full text-white text-lg 
            transition-all duration-300 hover:bg-[#ff5a70] hover:-translate-y-1"
          >
            Return to Login
          </Link>
        </div>
        <div className="right-side flex-1 relative overflow-hidden hidden md:block">
          <div className="absolute inset-0 group">
            <img 
              src={balImage} 
              alt="Basketball Africa League" 
              className="w-full h-full object-cover transition-transform duration-1500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;