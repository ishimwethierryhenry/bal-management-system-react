import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUser, 
  FaCalendarAlt, 
  FaBasketballBall, 
  FaSignOutAlt,
  FaCalendarCheck,
  FaTrophy,
  FaUserFriends
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed

const UserDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { currentUser, logout } = useAuth();

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const loadNotifications = async () => {
    try {
      const response = await fetch('/notifications/user/unread');
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await fetch(`/notifications/mark-as-read/${notificationId}`, {
        method: 'PUT'
      });
      loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await fetch('/notifications/user/mark-all-as-read', {
        method: 'PUT'
      });
      loadNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    loadNotifications();
    const intervalId = setInterval(loadNotifications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#001f3f] to-[#0074d9]">
      {/* Drawer Navigation */}
      <div className="w-[250px] bg-black/80 p-5 h-screen fixed">
        <div className="text-center pb-5 border-b border-white/10">
          <img 
            src={currentUser?.profilePicturePath || '/api/placeholder/80/80'}
            alt="User Profile" 
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h3 className="text-white text-xl">
            {currentUser?.firstName} {currentUser?.lastName}
          </h3>
        </div>
        
        <nav className="mt-5">
          {[
            { icon: <FaTachometerAlt />, text: 'Dashboard', link: '#' },
            { icon: <FaUser />, text: 'Profile', link: '/user/profile' },
            { icon: <FaCalendarAlt />, text: 'Events', link: '#' },
            { icon: <FaBasketballBall />, text: 'Teams', link: '#' },
            { icon: <FaSignOutAlt />, text: 'Logout', link: '/login', onClick: logout }
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.link} 
              onClick={item.onClick}
              className="flex items-center text-white p-4 hover:bg-white/10 transition"
            >
              <span className="mr-3 w-5">{item.icon}</span>
              {item.text}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-[250px] flex-1 p-5 text-white">
        <h1 className="text-3xl mb-5">
          Welcome, {currentUser?.firstName || 'User'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Notification Center */}
          <div className="bg-white/10 p-5 rounded-lg">
            <h2 className="text-2xl mb-3">
              Notifications 
              <span className="bg-yellow-500 text-[#001f3f] rounded-full px-2 ml-2">
                {unreadCount}
              </span>
            </h2>
            <button 
              onClick={markAllNotificationsAsRead}
              className="bg-yellow-500 text-[#001f3f] px-4 py-2 rounded mb-4 hover:opacity-90"
            >
              Mark All as Read
            </button>
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="bg-white/5 p-4 rounded mb-3 border-l-4 border-yellow-500 hover:bg-white/10 cursor-pointer"
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{notification.title}</span>
                    <span className="text-sm opacity-70">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  <div>{notification.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Cards */}
          {[
            { icon: <FaCalendarCheck className="mx-auto text-2xl" />, value: '3 Upcoming Events' },
            { icon: <FaTrophy className="mx-auto text-2xl" />, value: 'Team Rank: 5th' },
            { icon: <FaUserFriends className="mx-auto text-2xl" />, value: '12 Friends' }
          ].map((card, index) => (
            <div 
              key={index} 
              className="bg-white/10 p-5 rounded-lg text-center hover:translate-y-[-5px] transition"
            >
              {card.icon}
              <div className="text-2xl font-bold mt-3">{card.value}</div>
            </div>
          ))}
        </div>

        {/* Profile Section */}
        <div className="bg-white/10 p-5 rounded-lg mt-5">
          <h2 className="text-2xl mb-3">My Profile</h2>
          <p>
            Welcome to your personal dashboard. Here, you can view your upcoming events, 
            monitor your team's progress, and stay connected with your friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;