import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/apiServices';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 'user-1',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@example.com',
  role: 'Buyer',
  location: 'Hyderabad, Telangana',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 43210'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rythu_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [currentLocation, setCurrentLocation] = useState('Hyderabad, Telangana');

  useEffect(() => {
    if (user) {
      localStorage.setItem('rythu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rythu_user');
    }
  }, [user]);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
    localStorage.setItem('rythu_auth_token', data.token);
    return data.user;
  };

  const register = async (userData) => {
    const data = await authApi.register(userData);
    setUser(data.user);
    localStorage.setItem('rythu_auth_token', data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rythu_auth_token');
    localStorage.removeItem('rythu_user');
  };

  const updateProfile = (updated) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        currentLocation,
        setCurrentLocation,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
