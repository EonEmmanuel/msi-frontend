import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('mtn_elite_token');
    const user = localStorage.getItem('mtn_elite_user');
    const timestamp = localStorage.getItem('mtn_elite_user_token_timestamp');
    
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }

     const TEN_HOURS = 10 * 60 * 60 * 5000; // 5 hours in ms

    if (token && timestamp) {
      const age = Date.now() - parseInt(timestamp, 10);

      if (age > TEN_HOURS) {
        // Expired: remove token
        localStorage.removeItem('mtn_elite_token');
        localStorage.removeItem('mtn_elite_user');
        localStorage.removeItem('mtn_elite_user_token_timestamp');
      }
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError('');
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message);
      }
      
      localStorage.setItem('mtn_elite_token', data.token);
      localStorage.setItem('mtn_elite_user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Register function

  const createuser = async (username, email, phone, password) => {
    try {

      setError('');
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message);
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('mtn_elite_token');
    localStorage.removeItem('mtn_elite_user');
    setCurrentUser(null);
  };

  // Get user profile
  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');
      
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    createuser,
    logout,
    getProfile,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
