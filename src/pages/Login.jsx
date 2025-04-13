import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthForm.css';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', formData);
      if (res.data.success) {
        // Save auth token in localStorage
        localStorage.setItem('authToken', res.data.token);
        // Update user state
        setUser(res.data.user);
        // Navigate to contacts page
        navigate('/contacts');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h2 className="auth-form-header">Login</h2>
        {error && <div className="auth-form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="email" className="auth-form-label">Email</label>
            <input
              type="email"
              className="auth-form-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password" className="auth-form-label">Password</label>
            <input
              type="password"
              className="auth-form-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="auth-form-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-form-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="return-home-container">
          <Link to="/" className="return-home-btn">Return Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;