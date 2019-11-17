const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

const bookController = (bookService, nav) => {
  const middleware = (req, res, next) => {
    // if (req.user) {
      next();
    // } else {
      // res.redirect('/');
    // }
  };

  const getIndex = (req, res) => {
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

        // get objects from the database
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
  };

  const getById = (req, res) => {
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
        if (book) {
          book.details = await bookService.getBookById(book.bookId);
        }

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
  };

  return { getIndex, getById, middleware };
};

module.exports = bookController;
