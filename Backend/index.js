const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQLite database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL
      )
    `);
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({message: 'Working just fine'});
});

// Add favorite city
app.post('/api/favorites', (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }
  const sql = 'INSERT INTO favorites (city) VALUES (?)';
  db.run(sql, [city], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, city });
  });
});

// Get favorite cities
app.get('/api/favorites', (req, res) => {
  const sql = 'SELECT * FROM favorites';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ favorites: rows });
  });
});

// Remove favorite city
app.delete('/api/favorites/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM favorites WHERE id = ?';
  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Favorite city deleted' });
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
