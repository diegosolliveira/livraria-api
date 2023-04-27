import { useState, useEffect } from 'react';
import api from '../../services/api';
import history from '../../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

  }, []);
  
  async function handleLogin() {
    const token = crypto.randomBytes(4).toString('hex');
    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push('/home');
    window.location.reload(false);
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
    window.location.reload(false);
  }
  
  return { authenticated, handleLogin, handleLogout };
}