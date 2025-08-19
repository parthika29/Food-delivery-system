import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
          setToken('');
        });
    }
  }, [token]);

  const login = async (email, password, userType) => {
    setLoading(true);
    try {
      let url;
      if (userType === 'chef') {
        url = '/api/chef/login';
      } else if (userType === 'admin') {
        url = '/api/auth/login';
      } else {
        url = '/api/auth/login';
      }
      const res = await axios.post(url, { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      let url;
      if (payload.role === 'chef') {
        url = '/api/chef/register';
      } else {
        url = '/api/auth/register';
      }
      const res = await axios.post(url, payload);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
