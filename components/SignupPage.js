import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSignup = async () => {
    console.log("On signup page");
    //console.log("CODE HAS CHANGED 11-6-2024!!!");
    try {
      // localhost may or may not be an issue
      /*
      CHANGE BROWSING TO NON-ABSOLUTE.
      CANNOT USE LOCALHOST ON INTERNET.
      */
       // const response = await axios.post('http://localhost:3001/signup', {
       const response = await axios.post('/signup', {
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
        <br></br><br></br><br></br><br></br><br></br><br></br>
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
