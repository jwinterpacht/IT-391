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
  host: 'localhost',                //if this doesn't work, make it 127.0.0.1
  user: 'userjonah', // Replace with your MySQL username
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


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
