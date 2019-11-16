/* eslint-disable linebreak-style */
const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();

const router = (nav) => {
  bookRouter.route('/')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
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
          const collection = await db.collection('books');
          const books = await collection.find().toArray();
          res.render('bookListView',
            {
              nav,
              title: 'Books',
              books
            });
        } catch (err) { debug(err.stack); }
        client.close();
      })();
    });

  // implement logout for the app

  bookRouter.route('/:id')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      const { id } = req.params;
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
          const collection = await db.collection('books');
          const book = await collection.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render('bookView',
            {
              nav,
              title: 'Book',
              book
            });
        } catch (err) {
          debug(err.stack);
        }
      })();
    });

  return bookRouter;
};

module.exports = router;
