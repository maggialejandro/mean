'use strict';

module.exports = {
  env: 'development',
  mongo: {
    uri: 'mongodb://localhost/fullstack-dev'
  },
  sequelize: {
  	database: 'node',
  	username : 'root',
	password : 'root',
	port: 3306,
	host: 'localhost'
  }
};