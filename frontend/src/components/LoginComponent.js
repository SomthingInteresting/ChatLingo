// LoginComponent.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../utils/authService';
import '../styles/LoginStyles.css';


const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // Handle successful login, e.g., redirect to another page
    } catch (err) {
      // Handle error during login
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default LoginComponent;
