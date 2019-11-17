/* eslint-disable linebreak-style */
const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

const bookRouter = express.Router();

const router = (nav) => {
  // Route for the list of books
  const { getIndex, getById, middleware } = bookController(bookService, nav);

  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);

  // Route for a specific book
  bookRouter.route('/:id')
    .get(getById);

  // implement logout for the app

  return bookRouter;
};

module.exports = router;
