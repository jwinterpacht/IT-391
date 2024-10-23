import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Apps.css'; // Import your global styles here

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        username,
        password,
      });

      alert('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during signup.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create an Account</h1>
        {error && <p className="error-text">{error}</p>}
        <div className="form-inputs">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSignup}
          className={isHovered ? 'signup-button hover' : 'signup-button'}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
