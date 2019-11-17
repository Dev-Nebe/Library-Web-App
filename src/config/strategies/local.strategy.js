const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

const localStrategy = () => {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async () => {
      let client;

      try {
        client = await MongoClient.connect(url);
        debug('Successfully connected to server');

        const db = client.db(dbName);
        const collections = db.collection('users');
        const userFound = await collections.findOne({ username });

        if (userFound && userFound.password === password) {
          // const user = { username, password };
          done(null, userFound);
        } else { done(null, false); }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }));
};

// Implement the validation of users

module.exports = localStrategy;
