const express = require('express');
//const mysql = require('mysql');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors for cross-origin requests
const bodyParser = require('body-parser'); // For parsing request body

const app = express();
const port = 3001; // Use the same port as in the frontend

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost', //if this doesn't work, make it 127.0.0.1
  user: 'userjaden',
  password: 'my_password', // Replace with your MySQL password
  database: 'my_database', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Route to get all items
app.get('/items', (req, res) => {
  db.query('SELECT * FROM shopping_list', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});


// Route to add a new item
app.post('/items', (req, res) => {
  console.log("Received POST request:", req.body);
  const { ListItem } = req.body; // Destructure the ListItem from the request body
  console.log("ListItem:", ListItem);
  db.query('INSERT INTO shopping_list (ListItem) VALUES (?)', [ListItem], (err, result) => {
    if (err) {
      console.error("Error inserting into database!", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Item inserted successfully:", result);
    res.status(201).json({ id: result.insertId, ListItem }); // Send back the inserted item
  });
});

// Route to get all items from the inventory table
app.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Route to add a new item to the inventory
app.post('/inventory', (req, res) => {
  const { item_name, quantity, expiration_date, category, upc_code } = req.body; // Destructure the data from the request body
  const query = 'INSERT INTO inventory (item_name, quantity, expiration_date, category, upc_code) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [item_name, quantity, expiration_date, category, upc_code], (err, result) => {
    if (err) {
      console.error("Error inserting into inventory table!", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, item_name, quantity, expiration_date, category, upc_code });
  });
});

// Route to delete an item from the inventory by id
app.delete('/inventory/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM inventory WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// Route to update an item in the inventory by id
app.put('/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { item_name, quantity, expiration_date, category, upc_code } = req.body;
  
  const query = 'UPDATE inventory SET item_name = ?, quantity = ?, expiration_date = ?, category = ?, upc_code = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  
  db.query(query, [item_name, quantity, expiration_date, category, upc_code, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item updated successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
