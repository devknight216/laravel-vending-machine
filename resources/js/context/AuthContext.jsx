import { enqueueSnackbar } from 'notistack';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password, remember) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/login', {
        email,
        password,
        remember,
      }).then((response) => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        enqueueSnackbar('Login successful', { variant: 'success', autoHideDuration: 3000 });
        resolve();
      }).catch((error) => {
        enqueueSnackbar('Invalid email or password', { variant: 'error', autoHideDuration: 3000 });
        reject(error);
      });
    })
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
    setCurrentUser(null);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setCurrentUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  const updateCurrentUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateCurrentUser, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
