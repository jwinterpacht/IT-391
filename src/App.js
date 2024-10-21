import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import InventoryPage from './components/InventoryPage';
import SettingsPage from './components/SettingsPage';
import RecipesPage from './components/RecipesPage'; // Import RecipesPage
import './App.css'; // Import global CSS

function App() {
  // Sample inventory data
  const [inventoryItems] = useState([
    { name: 'Milk', quantity: '1 Liter' },
    { name: 'Eggs', quantity: '12' },
    { name: 'Flour', quantity: '500g' },
  ]);

  return (
    <Router>
      <header>
        <h1>Dean's Food List</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route
          path="/recipes"
          element={<RecipesPage inventoryItems={inventoryItems} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
