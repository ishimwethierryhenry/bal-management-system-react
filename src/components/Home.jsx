import { motion } from "framer-motion";
import React, { useState } from 'react';
import { Globe, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

// Header Component
const Header = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 flex justify-between items-center p-4">
      <div className="flex items-center">
        <img 
          src="/images/bal_image.jpeg" 
          alt="BAL Logo" 
          className="h-10 mr-3" 
        />
        <h1 className="text-2xl font-bold text-yellow-400 transition-colors duration-500 hover:text-blue-500">
          Basketball Africa League
        </h1>
      </div>

      <nav className="flex space-x-4">
        <Link 
          to="/register" 
          className="text-white px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all"
        >
          Sign Up
        </Link>
        <Link 
          to="/login" 
          className="text-white px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all"
        >
          Login
        </Link>
      </nav>

      <div 
        className="relative cursor-pointer"
        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
      >
        <Globe className="text-white w-8 h-8" />
        {isLanguageDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-black/90 rounded-lg shadow-lg">
            <a 
              href="/changeLanguage?lang=en" 
              className="block px-4 py-2 text-white hover:bg-blue-600"
            >
              English
            </a>
            <a 
              href="/changeLanguage?lang=fr" 
              className="block px-4 py-2 text-white hover:bg-blue-600"
            >
              French
            </a>
            <a 
              href="/changeLanguage?lang=sw" 
              className="block px-4 py-2 text-white hover:bg-blue-600"
            >
              Swahili
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{backgroundImage: "url('/images/home_logo.jpg')"}}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <h1 className="text-5xl font-bold text-yellow-400 mb-6">
          Experience the Thrill of African Basketball!
        </h1>
        
        <p className="text-white text-xl mb-6">
          Become a part of the Basketball Africa League (BAL), where exceptional talent meets thrilling competition and meaningful community engagement.
        </p>
        
        <div className="flex justify-center space-x-6 mt-10">
          <Link 
            to="/register"
            className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg hover:bg-yellow-400 hover:text-blue-900 transition-all"
          >
            Join Now
          </Link>
          
          <Link 
            to="/about"
            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg hover:bg-white hover:text-blue-900 transition-all"
          >
            Learn More
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-yellow-400" />,
      title: "Elite Talent",
      description: "Watch Africa's top players in thrilling competition."
    },
    {
      icon: <Award className="w-12 h-12 text-yellow-400" />,
      title: "Community Impact", 
      description: "Be part of a league that fosters growth and unity."
    },
    {
      icon: <Globe className="w-12 h-12 text-yellow-400" />,
      title: "Exclusive Access",
      description: "Get live games, stats, and exclusive content."
    }
  ];

  return (
    <section className="bg-blue-900 py-20 px-4">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-16">
        Why Join the BAL?
      </h2>
      
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.3 
            }}
            whileHover={{ scale: 1.05 }}
            className="bg-purple-700 p-6 rounded-lg w-80 text-center hover:bg-blue-600 transition-all"
          >
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-200">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black/80 text-white text-center py-6">
      <p>&copy; 2024 Basketball Africa League. All Rights Reserved.</p>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-500 min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;