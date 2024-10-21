import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Assuming you want to use a separate CSS file

function HomePage() {
  const [inputText, setInputText] = useState(''); // Store textbox value
  const [newItems, setNewItems] = useState([]); // Store the list of items

  // Fetch existing items from the database when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:3001/items'); //3000 or 3001?
      setNewItems(response.data);
    };
    fetchItems();
  }, []);

  // Handle adding an item
  const addItem = async () => {
    if (!inputText.trim()) { // Check if input is empty
      alert('Please enter an item.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/items', { ListItem: inputText });
      console.log("LINE 27 JUST RAN");
      setNewItems([...newItems, response.data]); // Update the item list
      setInputText(''); // Clear the input
    } catch (error) {
      console.log("ERROR CAUGHT");
      console.error('Error adding item:', error);
    }
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
        <p>Welcome to Dean's List!</p>
        
        <div className="quick-entry">
          <input 
            type="text" 
            id="new-item" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} // Update inputText on change
            placeholder="Add a new item"
          />
          <button id="add-button" onClick={addItem}>Add</button>

          <ul>
            {newItems.map((item, index) => (
              <li key={index}>{item.ListItem}</li> // Render ListItem from the response
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
