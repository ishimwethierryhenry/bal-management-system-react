import React, { useState, useEffect } from 'react';
import { Download, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('username');
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState('');
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({ show: false, message: '', type: 'info' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/users', {
          method: 'GET',
          credentials: 'include' // Important for maintaining session
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Optionally set an error state to show to the user
      }
    };
  
    fetchUsers();
  }, [currentPage, search, searchCriteria, sortBy, sortDir]);

  const handleAddUser = () => {
    navigate('/admin/users/add');
  };

  const handleEditUser = (id) => {
    navigate(`/admin/users/update/${id}`);
  };

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      // Implement delete logic
      console.log(`Deleting user ${id}`);
    }
  };

  const handleDownload = (format) => {
    setDownloadDropdownOpen(false);
    setDownloadStatus({ 
      show: true, 
      message: `Preparing ${format} download...`, 
      type: 'info' 
    });

    // Simulate download
    setTimeout(() => {
      setDownloadStatus({ 
        show: true, 
        message: `Download ${format} completed!`, 
        type: 'success' 
      });
      setTimeout(() => {
        setDownloadStatus({ show: false, message: '', type: 'info' });
      }, 3000);
    }, 1500);
  };

  const handleSort = (sortOption) => {
    const [by, dir] = sortOption.split(',');
    setSortBy(by);
    setSortDir(dir);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic
    console.log('Searching', search, 'by', searchCriteria);
  };

  const handleResetSearch = () => {
    setSearch('');
    setSearchCriteria('username');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-5 bg-black/70 sticky top-0 z-50">
        <h1 className="text-3xl flex items-center">
          <img 
            src="/images/uppermostlogo.jpg" 
            alt="BAL Logo" 
            className="h-10 mr-3"
          />
          Basketball Africa League
        </h1>
        <nav className="flex space-x-4">
          <a href="/admin/users/dashboard" className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/40 transition">Home</a>
          <a href="/admin/users" className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/40 transition">User Management</a>
          <a href="/login" className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/40 transition">Logout</a>
        </nav>
      </header>

      {/* Container */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl mb-6">User Management</h2>

        {/* Download Dropdown */}
        <div className="relative inline-block mb-4">
          <button 
            onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
            className="flex items-center bg-black/70 text-white px-4 py-2 rounded"
          >
            <Download className="mr-2" /> Download
          </button>
          {downloadDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-black/70 rounded shadow-lg">
              <button 
                onClick={() => handleDownload('pdf')} 
                className="block w-full text-left px-4 py-2 hover:bg-white/20"
              >
                PDF
              </button>
              <button 
                onClick={() => handleDownload('csv')} 
                className="block w-full text-left px-4 py-2 hover:bg-white/20"
              >
                CSV
              </button>
              <button 
                onClick={() => handleDownload('excel')} 
                className="block w-full text-left px-4 py-2 hover:bg-white/20"
              >
                Excel
              </button>
            </div>
          )}
        </div>

        {/* Download Status */}
        {downloadStatus.show && (
          <div className={`p-4 rounded mb-4 ${
            downloadStatus.type === 'info' 
              ? 'bg-blue-500' 
              : downloadStatus.type === 'success' 
              ? 'bg-green-500' 
              : 'bg-red-500'
          }`}>
            {downloadStatus.message}
          </div>
        )}

        {/* Add User Button */}
        <button 
          onClick={handleAddUser}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center mb-4"
        >
          <Plus className="mr-2" /> Add User
        </button>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center space-x-2">
          <Search className="text-yellow-500" />
          <select 
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            className="bg-white/30 text-white p-2 rounded"
          >
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </select>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="bg-white/30 text-white p-2 rounded flex-grow"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
          <button 
            type="button"
            onClick={handleResetSearch}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </form>

        {/* Sorting */}
        <div className="mb-4">
          <label className="mr-2 text-yellow-500">Sort By:</label>
          <select 
            onChange={(e) => handleSort(e.target.value)}
            className="bg-white/30 text-white p-2 rounded"
          >
            <option value="">Select Sorting</option>
            <option value="username,asc">Username (A-Z)</option>
            <option value="username,desc">Username (Z-A)</option>
            <option value="email,asc">Email (A-Z)</option>
            <option value="email,desc">Email (Z-A)</option>
            <option value="role,asc">Role (A-Z)</option>
            <option value="role,desc">Role (Z-A)</option>
          </select>
        </div>

        {/* User Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-black/60 text-yellow-500 p-4">ID</th>
              <th className="bg-black/60 text-yellow-500 p-4">Username</th>
              <th className="bg-black/60 text-yellow-500 p-4">Email</th>
              <th className="bg-black/60 text-yellow-500 p-4">Role</th>
              <th className="bg-black/60 text-yellow-500 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-white/30 transition">
                <td className="bg-white/20 p-4 text-center">{user.id}</td>
                <td className="bg-white/20 p-4 text-center">{user.username}</td>
                <td className="bg-white/20 p-4 text-center">{user.email}</td>
                <td className="bg-white/20 p-4 text-center">{user.role}</td>
                <td className="bg-white/20 p-4 text-center">
                  <button 
                    onClick={() => handleEditUser(user.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          {currentPage > 0 && (
            <button 
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-white/20 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
          )}
          <span className="bg-white/20 text-white px-4 py-2 rounded">
            Page {currentPage + 1}
          </span>
          {currentPage < totalPages - 1 && (
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-white/20 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;