import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory



  const handleLogin = async () => {



    console.log("On Login page");
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      // Store the JWT token in local storage
      localStorage.setItem('token', response.data.token);
      //sessionStorage.setItem('token', response.data.token); //store JWT in session storage, so it resets when the tab or window is closed.
      //console.log('LoginPage.js: Token stored in sessionStorage:', sessionStorage.getItem('token'));

      // Redirect to HomePage
      navigate('/home'); 
      //navigate('/inventory'); //tried for testing
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid username or password');
    }
  };

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br> <br></br><br></br><br></br><br></br><br></br>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}

export default LoginPage;
