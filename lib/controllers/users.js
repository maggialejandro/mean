'use strict';

var sequelize = require('../db/sequelize'),
    User = sequelize.User,
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  User.create(req.body)
  .success(function(user){
    req.logIn(user, function(err) {
      if (err) return next(err);

      return res.json(200, {
        username: user.username,
        role: user.role
      });
    });
  })
  .error(function(errors){
    res.send(403, "Error registering user.");
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.find(userId).success(function(user) {
    console.log(user);
    if(user)
      res.send({ profile: user });
    else
      res.send(404);
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  
  //req.user guarda el Obj User de Sequelize
  if(req.user.authenticate(oldPass)) {
    req.user.password = newPass;

    req.user.save().success(function(){
      res.send(200);
    });
  } else {
    res.send(403);
  }
  
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};