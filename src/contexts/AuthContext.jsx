import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from session storage
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      const userData = response.data;

      // Store user info
      sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
      sessionStorage.setItem('username', userData.username);
      sessionStorage.setItem('role', userData.role);

      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Call backend logout endpoint
    axios.get('/api/logout')
      .then(() => {
        // Clear session storage
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');

        // Reset state
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch(error => {
        console.error('Logout failed', error);
      });
  };

  const hasRole = (requiredRole) => {
    return user && user.role.toUpperCase() === requiredRole.toUpperCase();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      hasRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};