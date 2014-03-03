'use strict';

module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define('Pet', {
    name: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models){
        Pet.hasMany(models.User, { foreignKey: 'pet_id', joinTableModel: models.UserPets, allowNull: false })
      }
    }
  })

  return Pet;
}