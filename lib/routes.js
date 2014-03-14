'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');
var passport = require('passport');

/**
 * Application routes
 */
module.exports = function(app) {
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('/prueba', function(req, res) {
    var sequelize = require('./db/sequelize'),
    user = sequelize.User;
    console.log(user);
  });

  //app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
  /*
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    successRedirect: '/', failureRedirect: '/login' 
  }));*/
  /*
  app.get('/auth/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      var error = err || info;

      if (error) {
        console.log('error');
        return res.json(401, error);
      }

      req.logIn(user, function(err) {
        if (err){
          console.log('erasd');
          return res.send(err);
        }

        console.log('llega');
        res.send(200, {
          username: user.username,
          role: user.role
        });
      });
    })(req, res, next);
  });
*/
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};