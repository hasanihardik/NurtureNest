import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from '../config/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = cookies.get('accessToken');
    if (token) {
      try {
        const res = await axios.get('/user/getUser');
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-12 bg-purple-200 rounded-full mx-auto"></div>
            <div className="h-4 w-32 bg-purple-200 rounded mx-auto"></div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
