import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Assuming you want to use a separate CSS file

function HomePage() {
  // State to handle the new item input
  const [newItem, setNewItem] = useState('');

  // Handle adding an item (this is a placeholder function)
  const addItem = () => {
    if (!newItem) {
      alert('Please enter an item.');
      return;
    }
    console.log(`Added: ${newItem}`);
    setNewItem(''); // Clear the input after adding
  };

  return (
    <div>
      <header>
        <h1>Dean's Food List</h1>
      </header>

      <nav>
        <Link to="/inventory">My Inventory</Link>
        <Link to="/list">My List</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <section id="content">
        <p>Welcome to Dean's Food List!</p>
        
        {/* Quick Entry Form for Adding an Item to the List */}
        <div className="quick-entry">
          <input 
            type="text" 
            id="new-item" 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new item"
          />
          <button id="add-button" onClick={addItem}>Add</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
