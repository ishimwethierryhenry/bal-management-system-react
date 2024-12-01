import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'recharts';
import { 
  Users, 
//   Basketball, 
  Calendar, 
  Settings, 
  LogOut, 
  BarChart2, 
  Layout,
  CheckCircle,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const mockUserData = {
    totalUsers: 150,
    roleDistribution: [
      { name: 'Admin', value: 5 },
      { name: 'Player', value: 80 },
      { name: 'Coach', value: 15 },
      { name: 'Manager', value: 10 }
    ],
    registrationTrend: [
      { name: 'Jan', users: 20 },
      { name: 'Feb', users: 25 },
      { name: 'Mar', users: 30 },
      { name: 'Apr', users: 35 },
      { name: 'May', users: 40 },
      { name: 'Jun', users: 45 }
    ],
    auditTrails: [
      { timestamp: '2024-03-21 14:30', username: 'admin', action: 'User Created', details: 'New player account created' },
      { timestamp: '2024-03-21 13:45', username: 'admin', action: 'Team Updated', details: 'Team roster modified' },
      { timestamp: '2024-03-21 12:15', username: 'admin', action: 'Match Scheduled', details: 'New match added to calendar' }
    ]
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Implement notification sending logic here
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setNotificationTitle('');
    setNotificationMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-900 to-blue-600">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
      >
        <Menu size={24} />
      </button>

      {/* Drawer Navigation */}
      <div className={`fixed lg:static w-64 h-full bg-black/80 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 text-center border-b border-white/10">
          <img 
            src="/api/placeholder/80/80"
            alt="Admin Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h3 className="text-white font-bold">Admin Name</h3>
          <p className="text-white/70">Super Admin</p>
        </div>

        <nav className="mt-6">
          {[
            { icon: <Layout size={20} />, label: 'Dashboard', path: '/admin' },
            { icon: <Users size={20} />, label: 'User Management', path: '/admin/users' },
            // { icon: <Basketball size={20} />, label: 'Teams', path: '/admin/teams' },
            { icon: <Calendar size={20} />, label: 'Schedules', path: '/admin/schedules' },
            { icon: <BarChart2 size={20} />, label: 'Statistics', path: '/admin/statistics' },
            { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
            { icon: <LogOut size={20} />, label: 'Logout', path: '/login' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full px-6 py-4 flex items-center text-white hover:bg-white/10 transition-colors"
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-64">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Statistics Cards */}
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Total Users</h3>
              <Users className="text-white" size={24} />
            </div>
            <div className="text-3xl font-bold text-white">{mockUserData.totalUsers}</div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Active Teams</h3>
              {/* <Basketball className="text-white" size={24} /> */}
            </div>
            <div className="text-3xl font-bold text-white">12</div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">System Status</h3>
              <CheckCircle className="text-white" size={24} />
            </div>
            <div className="text-3xl font-bold text-white">Healthy</div>
          </div>
        </div>

        {/* Notification Panel */}
        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Send Notification</h2>
          <form onSubmit={handleNotificationSubmit} className="space-y-4">
            <input
              type="text"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
              placeholder="Notification Title"
              className="w-full p-3 rounded bg-black/50 text-white border border-white/20"
              required
            />
            <textarea
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Message to users"
              className="w-full p-3 rounded bg-black/50 text-white border border-white/20 h-32"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded hover:bg-yellow-400 transition-colors"
            >
              Send Notification
            </button>
          </form>
          {showSuccess && (
            <div className="mt-4 p-4 bg-green-500/20 text-green-300 rounded">
              Notification sent successfully!
            </div>
          )}
          {showError && (
            <div className="mt-4 p-4 bg-red-500/20 text-red-300 rounded">
              Error sending notification. Please try again.
            </div>
          )}
        </div>

        {/* Audit Trail */}
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Audit Trail</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 text-yellow-500">Timestamp</th>
                  <th className="text-left p-4 text-yellow-500">User</th>
                  <th className="text-left p-4 text-yellow-500">Action</th>
                  <th className="text-left p-4 text-yellow-500">Details</th>
                </tr>
              </thead>
              <tbody>
                {mockUserData.auditTrails.map((trail, index) => (
                  <tr key={index} className="bg-white/5">
                    <td className="p-4 text-white">{trail.timestamp}</td>
                    <td className="p-4 text-white">{trail.username}</td>
                    <td className="p-4 text-white">{trail.action}</td>
                    <td className="p-4 text-white">{trail.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;