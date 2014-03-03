'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserPets = sequelize.define('UserPets', {
    pet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: "Pet",
      referencesKey: "id"
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: "User",
      referencesKey: "id"
    },
    cantidad: {
    	type: DataTypes.INTEGER,
    	allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models){
        //UserPets
         // .belongsTo(models.Pet, {foreignKey : 'pet_id'})
          //.belongsTo(models.User, {foreignKey : 'user_id'})
      }
    }
  })

  return UserPets;
}