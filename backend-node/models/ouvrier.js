'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ouvrier = sequelize.define('Ouvrier', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    telephone: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Ouvrier.associate = function(models) {
    // associations can be defined here
    models.Ouvrier.hasMany(models.ChantierOuvrier);
  };
  return Ouvrier;
};