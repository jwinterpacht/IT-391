import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'; // Import SignupPage
import HomePage from './components/HomePage';
import InventoryPage from './components/InventoryPage';
import SettingsPage from './components/SettingsPage';
import RecipesPage from './components/RecipesPage'; // Import RecipesPage
import './App.css'; // Import global CSS

function App() {
  // Sample inventory data
  const [inventoryItems] = useState([
    { name: 'Milk', quantity: '3 Liters' },
    { name: 'Eggs', quantity: '12' },
    { name: 'Flour', quantity: '500g' },
  ]);



  
  //When app loads (or any page), check useState of user's logged in state
  const [isAuthentic, setIsAuthentic] = useState(() => {
    console.log("initalizd isAuthentic");
    const token = localStorage.getItem('token');
    return !!token;
  })


  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token when logging out
    setIsAuthentic(false); // Update the authentication state
    console.log('User logged out');
  };


  // Function to check if the user is authenticated (if token exists in local storage)
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log('AUTHENTICATED!');
    console.log("isAuthetnic: " + isAuthentic);
    return !!token && isAuthentic; // Returns true if token is not null or undefined
  };


  return (
    <Router>
      <header>
        <h1>Dean's Food List</h1>
        <h2>Dean's list of food</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/settings">Settings</Link>
          
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <Routes>
        {/* Redirect to the login page if the user is not authenticated */}
        <Route path="/" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add Signup route */}

        {/* Protect routes to ensure user is logged in */}
        <Route path="/inventory" element={isAuthenticated() ? <InventoryPage /> : <Navigate to="/login" />} />
        <Route
          path="/recipes"
          element={isAuthenticated() ? <RecipesPage inventoryItems={inventoryItems} /> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={isAuthenticated() ? <SettingsPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
