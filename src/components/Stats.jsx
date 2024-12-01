import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Stats = () => {
  // Sample player stats data (you'll likely replace this with actual data from an API)
  const [playerStats, setPlayerStats] = useState([
    {
      id: 1,
      player: 'Player 1',
      team: 'Team A',
      points: 20,
      assists: 5,
      rebounds: 7
    },
    {
      id: 2,
      player: 'Player 2',
      team: 'Team B',
      points: 15,
      assists: 8,
      rebounds: 6
    },
    {
      id: 3,
      player: 'Player 3',
      team: 'Team C',
      points: 18,
      assists: 6,
      rebounds: 9
    },
    {
      id: 4,
      player: 'Player 4',
      team: 'Team D',
      points: 22,
      assists: 4,
      rebounds: 5
    }
  ]);

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  // Sorting function
  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const sortedStats = [...playerStats].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setPlayerStats(sortedStats);
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-70 text-center py-5">
        <h1 className="text-2xl font-bold">Player Stats</h1>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Statistics Overview</h2>
        <p className="text-xl mb-8">
          Explore the statistics of players in the Basketball Africa League.
        </p>

        {/* Stats Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr className="bg-black bg-opacity-50">
                {['player', 'team', 'points', 'assists', 'rebounds'].map((header) => (
                  <th 
                    key={header}
                    className="p-3 text-center cursor-pointer hover:bg-black hover:bg-opacity-60"
                    onClick={() => sortTable(header)}
                  >
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                    {sortConfig.key === header && (
                      <span className="ml-2">
                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {playerStats.map((stat) => (
                <tr 
                  key={stat.id} 
                  className="border-b border-white border-opacity-20 hover:bg-black hover:bg-opacity-30 transition"
                >
                  <td className="p-3">{stat.player}</td>
                  <td className="p-3">{stat.team}</td>
                  <td className="p-3">{stat.points}</td>
                  <td className="p-3">{stat.assists}</td>
                  <td className="p-3">{stat.rebounds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4 mt-12 flex-wrap gap-4">
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
            View Players
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

export default Stats;