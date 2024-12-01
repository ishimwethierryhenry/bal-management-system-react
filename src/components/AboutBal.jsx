import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Users, Award } from 'lucide-react';

const AboutBal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-500 text-white">
      {/* Header */}
      <header className="bg-black/70 py-6 text-center">
        <h1 className="text-4xl font-bold">About the Basketball Africa League</h1>
      </header>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mission-section text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed">
            The Basketball Africa League (BAL) is committed to advancing and elevating the sport of basketball across the African continent. By providing a competitive arena for elite athletes, the BAL highlights Africa's exceptional talent and promotes the growth of the sport at all levels. In partnership with the NBA, we strive to inspire a passion for basketball, engage fans from diverse communities, and build a vibrant community that celebrates the game.
          </p>
        </motion.section>

        {/* History Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="history-section text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Our History</h2>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed">
            Founded in 2020, the Basketball Africa League (BAL) represents a significant milestone in the world of sports, created through a historic partnership between the NBA and FIBA. This groundbreaking league is the first instance of the NBA joining forces to operate a league outside of North America, underscoring its dedication to expanding basketball's reach.
          </p>
        </motion.section>

        {/* Core Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="values-section"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Core Values</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Values Cards */}
            <div className="bg-black/50 p-6 rounded-lg w-72 text-center">
              <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
              <p>Striving for the highest standards in athleticism, coaching, and fan engagement.</p>
            </div>
            <div className="bg-black/50 p-6 rounded-lg w-72 text-center">
              <h3 className="text-2xl font-semibold mb-4">Community</h3>
              <p>Building strong connections with communities to promote growth and unity through sports.</p>
            </div>
            <div className="bg-black/50 p-6 rounded-lg w-72 text-center">
              <h3 className="text-2xl font-semibold mb-4">Inspiration</h3>
              <p>Inspiring future generations of players and fans across Africa and beyond.</p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="cta-buttons flex justify-center space-x-6 mt-16"
        >
          <Link 
            to="/" 
            className="bg-pink-500 text-white px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all"
          >
            HOME
          </Link>
          <Link 
            to="/register" 
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full hover:bg-pink-500 hover:text-white transition-all"
          >
            Join the BAL Community
          </Link>
          <Link 
            to="/login" 
            className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-900 transition-all"
          >
            Explore BAL Matches
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-black/70 text-center py-6">
        <p>&copy; 2024 Basketball Africa League. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutBal;