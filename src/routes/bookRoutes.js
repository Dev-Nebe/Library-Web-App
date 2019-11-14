/* eslint-disable linebreak-style */

const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');


const bookRouter = express.Router();

const router = (nav) => {
  let books = [
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        books = recordset;
        res.render('bookListView',
          {
            nav,
            title: 'Books',
            books
          });
      }());
    });

  bookRouter.route('/:id').get((req, res) => {
    (async function query() {
      const { id } = req.params;
      const request = new sql.Request();
      const { recordset } = await request.input('id', sql.Int, id).query('select * from books where id = @id');
      res.render('bookView',
        {
          nav,
          title: 'Book',
          book: recordset[0]
        });
    }());
  });

  return bookRouter;
};

module.exports = router;
