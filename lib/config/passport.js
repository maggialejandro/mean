'use strict';

var sequelize = require('../db/sequelize'),
    User = sequelize.User,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.find(id)
  .success(function(user){
    if (user){ done(null, user); }
    else{ done(null, false );}
  })
  .error(function(err){
    done(err);
  });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.find({ where: {email: email }})
    .success(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .error(function(err){
      if (err) { return done(err); }
    });
  }
));

module.exports = passport;