'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'basic-user', 'medium-user', 'advanced-user')
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};