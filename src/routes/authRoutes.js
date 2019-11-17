const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

const router = (nav) => {
  authRouter.route('/signUp')
    .post((req, res) => {
      // create user
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Correctly connected to the server');
          const db = client.db(dbName);
          const collection = await db.collection('users');
          const user = { username, password };
          const response = await collection.insertOne(user);
          debug(response);
          req.login(response.ops[0], () => {
            res.redirect('/auth/profile');
          });
          // res.json(response);
        } catch (err) {
          debug(err.stack);
        }
      })();
      // log them in
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signIn', { nav, title: 'Sign In' });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.send(req.user);
    });
  return authRouter;
};

module.exports = router;
