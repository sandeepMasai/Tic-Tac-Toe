import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token and fetch user profile
          const res = await API.get('/users/profile');
          setUser(res.data);
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('token'); // Invalid token, remove it
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data); // Set user data (username, email, id)
      return { success: true, message: res.data.message };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

 const register = async (username, email, password) => {
  setIsLoading(true);
  try {
    const res = await API.post('/auth/register', { username, email, password });


    return { success: true, message: res.data.message || 'Registration successful. Please log in.' };
  } catch (error) {
    console.error('Registration error:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
    return { success: false, message: errorMessage };
  } finally {
    setIsLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
