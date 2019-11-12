/* eslint-disable linebreak-style */
/* eslint-disable indent */

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const books = [];
// Next hard code the books and include them.

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));


app.set('views', './src/views');
app.set('view engine', 'ejs');


bookRouter.route('/')
.get((req, res) => {
  res.render('books', {
    nav: [{ link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }],
    title: 'Library App'
});
});
app.use('/books', bookRouter);


app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render('index.ejs', {
    nav: [{ link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }],
    title: 'Library App'
});
});


app.listen(port, () => {
    debug(`listening on port ${chalk.green(`${port}`)}`);
});
