require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

const DB_NAME = process.env.DB_NAME; 
const DB_NAME_POST = process.env.DB_NAME_POST; 
const COLLECTION_NAME = process.env.COLLECTION_NAME; 
const COLLECTION_NAME_POST = process.env.COLLECTION_NAME_POST; 


let db;
let db_post;
app.use(cors());
app.use(bodyParser.json());

MongoClient.connect(URL)
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);
    db_post = client.db(DB_NAME_POST);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.post('/orders', (req, res) => {
    const order = req.body;
  
    if (!db_post) {
      return res.status(500).json({ error: 'Database connection error' });
    }
  
    db_post.collection(COLLECTION_NAME_POST)
      .insertOne(order)
      .then(() => {
        res.status(200).json({ message: 'Order placed successfully' });
      })
      .catch((err) => {
        console.error('Error placing order:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });


app.get('/medicinies', (req, res) => {
  const pharmacy = req.query.pharmacy;
  const sortOrder = req.query.sortOrder || 'asc';

  if (!db) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const sortDirection = sortOrder === 'asc' ? 1 : -1;


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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});