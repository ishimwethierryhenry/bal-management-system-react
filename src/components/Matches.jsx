import React from 'react';
import { Link } from 'react-router-dom';

const Matches = () => {
  // Sample match data (you'll likely replace this with actual data from an API)
  const matches = [
    {
      id: 1,
      teamA: 'Team A',
      teamB: 'Team B',
      date: 'October 15, 2024',
      time: '7:00 PM'
    },
    {
      id: 2,
      teamA: 'Team C',
      teamB: 'Team D',
      date: 'October 16, 2024',
      time: '8:00 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-70 text-center py-5">
        <h1 className="text-2xl font-bold">Upcoming Matches</h1>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Match Schedule</h2>
        <p className="text-xl mb-8">
          Stay tuned for the latest matches in the Basketball Africa League. 
          Below is the upcoming match schedule:
        </p>

        {/* Matches List */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          {matches.map((match) => (
            <div 
              key={match.id} 
              className="bg-black bg-opacity-50 p-4 rounded-lg w-full max-w-md text-left"
            >
              <strong className="block text-xl mb-2">
                {match.teamA} vs {match.teamB}
              </strong>
              <span className="block">Date: {match.date}</span>
              <span className="block">Time: {match.time}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4">
          <Link 
            to="/" 
            className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg hover:bg-pink-600 transition"
          >
            HOME
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg hover:bg-pink-600 transition"
          >
            Join the BAL Community
          </Link>
          <Link 
            to="/players" 
            className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg hover:bg-pink-600 transition"
          >
            Explore BAL Players
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-70 text-center py-5">
        <p>&copy; 2024 Basketball Africa League. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Matches;