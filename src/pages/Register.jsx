import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthForm.css';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '' // Added confirm password field
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if passwords match
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Log the response to confirm success
      console.log('Register response:', res.data);

      if (res.data.success) {
        // Set registered flag to true
        setRegistered(true);
        // Don't set the user here as we want them to log in
        // setUser(res.data.user);
        
        // Show success message for a moment
        setTimeout(() => {
          // Navigate to the login page after successful registration
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h2 className="auth-form-header">Register</h2>
        {error && <div className="auth-form-error">{error}</div>}
        {registered && <div className="auth-form-success">Registration successful! Redirecting to login...</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="name" className="auth-form-label">
              Name
            </label>
            <input
              type="text"
              className="auth-form-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="email" className="auth-form-label">
              Email
            </label>
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
            <label htmlFor="password" className="auth-form-label">
              Password
            </label>
            <input
              type="password"
              className="auth-form-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password2" className="auth-form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="auth-form-input"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>
          <button
            type="submit"
            className="auth-form-btn"
            disabled={loading || registered}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <div className="return-home-container">
          <Link to="/" className="return-home-btn">Return Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;