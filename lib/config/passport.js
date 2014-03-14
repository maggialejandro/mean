'use strict';

var sequelize = require('../db/sequelize'),
    User = sequelize.User,
    passport = require('passport'),
    secrets = require('./secrets'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

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

/**
 * Local Strategy
 */

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

/**
 * Sign in with Facebook.
 */

passport.use(new FacebookStrategy(secrets.facebook, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    console.log('entro');
    User.findOne({ $or: [{ facebook: profile.id }, { email: profile.email }] }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.save(function(err) {
            req.flash('info', { msg: 'Facebook account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    console.log('por acaa');
    User.find({ where: {facebook: profile.id }})
    .success(function(user) {
      if (user) {
        console.log('entrooooasd');
        return done(null, false, { 
          message: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' 
        });
      }else{
        User.create({
          nombre: profile.displayName,
          facebook: profile.id,
          password: profile.id
        })
        .success(function(user){
          req.logIn(user, function(err) {
            if (err) return next(err);

            done(err, user);
          });
        })
        .error(function(errors){
          res.send(403, "Error registering user.");
        });
      }

      return done(null, user);
    })
    .error(function(err){
      console.log('mal');
      if (err) { return done(err); }
    });

  }
}));

module.exports = passport;