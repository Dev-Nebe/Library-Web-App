const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false,
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    bookId: 5659,
    read: false
  },
];

const router = (nav) => {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async () => {
        const client = new MongoClient(url);
        try {
          // connect to the client
          await client.connect();
          debug('Connected correctly to the server');

          // create a database
          const db = client.db(dbName);

          // add objects to the database
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        // Once done, close the connection
        client.close();
      })();

      // res.send('inserting books');
    });
  return adminRouter;
};

module.exports = router;
