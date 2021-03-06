'use strict';

// Module dependencies
var express = require('express'),
	  http = require('http');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Express settings
require('./lib/config/express')(app);

// Mongo
//var mongodb = require('./lib/db/mongo');

// Populate empty DB with sample data
//require('./lib/config/dummydata');

// Sequelize
var sequelize = require('./lib/db/sequelize');

/* Sequelize Sync
sequelize
	.sequelize
  	.sync({force:true})
  	.complete(function(err) {
    	if (err) {
     		throw err
    	} else {
      		console.log('Sequelize sync complete');
    	}
  	});
*/

// Passport Configuration
var passport = require('./lib/config/passport');

// Routing
require('./lib/routes')(app);

// Start server
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

// Expose app
exports = module.exports = app;