import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSignup = async () => {
    console.log("On signup page");
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        username,
        password,
      });

      alert('Account created successfully! Please log in.');
      navigate('/login'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Signup failed', error);
      setError(error.response?.data?.error || 'An error occurred during signup.');
    }
  };

  return (
    <div>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
      <h1>Create an Account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default SignupPage;
