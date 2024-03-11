require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

const DB_NAME = process.env.DB_NAME; 
const COLLECTION_NAME = process.env.COLLECTION_NAME; 


let db;
app.use(cors());

MongoClient.connect(URL)
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Маршрут для получения данных
app.get('/medicinies', (req, res) => {
  const pharmacy = req.query.pharmacy;
  const sortOrder = req.query.sortOrder || 'asc';
  // Проверка наличия подключения к базе данных
  if (!db) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const sortDirection = sortOrder === 'asc' ? 1 : -1;

  // Запрос к коллекции для получения данных
  db.collection(COLLECTION_NAME)
    .find({pharmacy})
    .sort({price: sortDirection})
    .toArray()
    .then((medicinies) => {
      res.status(200).json(medicinies);
    })
    .catch((err) => {
      console.error('Error fetching medicinies:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Слушаем порт 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});