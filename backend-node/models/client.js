'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    telephone: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
    models.Client.hasMany(models.Chantier);
  };
  return Client;
};