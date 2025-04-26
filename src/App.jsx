import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ContactPage from './pages/ContactPage';
import './App.css';

// Set axios defaults
axios.defaults.baseURL = 'https://contact-keeper-api-43jp.onrender.com';
axios.defaults.withCredentials = true;
 
// Add axios interceptor for authentication
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await axios.get('/api/auth/me');
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log('Not authenticated');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
      localStorage.removeItem('authToken');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      
      <div > 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/contacts" /> : <Login setUser={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
         
          <Route path="/contacts" element={ user ? ( <ContactPage setUser={setUser} user={user} logout={logout} /> ) : ( <Navigate to="/" /> )}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;