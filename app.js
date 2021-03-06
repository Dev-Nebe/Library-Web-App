/* eslint-disable linebreak-style */
/* eslint-disable indent */

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const sql = require('mssql');


const app = express();
const port = process.env.PORT || 3000;

// const config = {
//   user: 'cp.nebe@gmail.com@node-express-nebe',
//   password: 'nebeNYSC82',
//   server: 'node-express-nebe.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
//   database: 'nodeExpressNebe',
//   options: {
//     encrypt: true
//   }
// };

// sql.connect(config).catch((err) => debug(err));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render('index.ejs', {
    nav,
    title: 'Library App'
});
});


app.listen(port, () => {
    debug(`listening on port ${chalk.green(`${port}`)}`);
});
