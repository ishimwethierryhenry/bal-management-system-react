import React from 'react';
import { Link } from 'react-router-dom';

const Players = () => {
  // Sample players data (you'll likely replace this with actual data from an API)
  const players = [
    {
      id: 1,
      name: 'Player 1',
      team: 'Team A',
      position: 'Guard'
    },
    {
      id: 2,
      name: 'Player 2',
      team: 'Team B',
      position: 'Forward'
    },
    {
      id: 3,
      name: 'Player 3',
      team: 'Team C',
      position: 'Center'
    },
    {
      id: 4,
      name: 'Player 4',
      team: 'Team D',
      position: 'Point Guard'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-70 text-center py-5">
        <h1 className="text-2xl font-bold">Players</h1>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Meet Our Players</h2>
        <p className="text-xl mb-8">
          Explore the talented players of the Basketball Africa League.
        </p>

        {/* Players List */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          {players.map((player) => (
            <div 
              key={player.id} 
              className="bg-black bg-opacity-50 p-4 rounded-lg w-full max-w-md text-left"
            >
              <strong className="block text-xl mb-2">
                {player.name}
              </strong>
              <span className="block">Team: {player.team}</span>
              <span className="block">Position: {player.position}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
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
            to="/stats" 
            className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg hover:bg-pink-600 transition"
          >
            View Stats
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

export default Players;