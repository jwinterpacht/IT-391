import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import InventoryPage from './components/InventoryPage';
import SettingsPage from './components/SettingsPage';
import RecipesPage from './components/RecipesPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './App.css';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation(); // Moved inside the Router context

  useEffect(() => {
    localStorage.removeItem('token'); // Clear token on app load for testing purposes
  }, []);

  return (
    <>
      <header>
        <h1>Dean's Food List</h1>
        <h2>Dean's list of food</h2>
      </header>

      {/* Conditionally hide navigation on login and signup pages */}
      {isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup' && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      )}

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
