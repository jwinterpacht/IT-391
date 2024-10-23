const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken'); // for creating and verifying tokens

const app = express();
const port = 3001;
const secretKey = 'your_secret_key'; // Use a secure key for signing JWT tokens

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'userjonah',
  password: 'my_password',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Route to CREATE a new user (signup)
// not sure if this should be placed, in the code, before or after 'User login route'
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});


// User login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Route to get all items (protected with JWT authentication)
app.get('/items', authenticateToken, (req, res) => {
  const userId = req.user.id; // Extract user id from JWT token

  db.query('SELECT * FROM shopping_list WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user; // Add the user info (from token) to the request object
    next(); // Proceed to the next middleware
  });
}

// Route to add a new item (protected with JWT authentication)
app.post('/items', authenticateToken, (req, res) => {
  const { ListItem } = req.body;
  const userId = req.user.id; // Extract user id from JWT token

  db.query('INSERT INTO shopping_list (ListItem, user_id) VALUES (?, ?)', [ListItem, userId], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ListItem });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
