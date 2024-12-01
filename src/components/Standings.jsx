import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Standings = () => {
  // Sample team standings data (you'll likely replace this with actual data from an API)
  const [teamStandings, setTeamStandings] = useState([
    {
      id: 1,
      team: 'Team A',
      wins: 5,
      losses: 1,
      points: 10
    },
    {
      id: 2,
      team: 'Team B',
      wins: 4,
      losses: 2,
      points: 8
    },
    {
      id: 3,
      team: 'Team C',
      wins: 3,
      losses: 3,
      points: 6
    },
    {
      id: 4,
      team: 'Team D',
      wins: 2,
      losses: 4,
      points: 4
    }
  ]);

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: 'points',
    direction: 'descending'
  });

  // Sorting function
  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const sortedStandings = [...teamStandings].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setTeamStandings(sortedStandings);
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-70 text-center py-5">
        <h1 className="text-2xl font-bold">Standings</h1>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Current Standings</h2>
        <p className="text-xl mb-8">
          Check out the latest standings of the teams in the Basketball Africa League.
        </p>

        {/* Standings Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr className="bg-black bg-opacity-50">
                {['team', 'wins', 'losses', 'points'].map((header) => (
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
              {teamStandings.map((standing) => (
                <tr 
                  key={standing.id} 
                  className="border-b border-white border-opacity-20 hover:bg-black hover:bg-opacity-30 transition"
                >
                  <td className="p-3">{standing.team}</td>
                  <td className="p-3">{standing.wins}</td>
                  <td className="p-3">{standing.losses}</td>
                  <td className="p-3">{standing.points}</td>
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
            to="/matches" 
            className="px-6 py-3 bg-pink-500 text-white rounded-full text-lg hover:bg-pink-600 transition"
          >
            View Matches
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

export default Standings;