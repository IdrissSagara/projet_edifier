'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mouvement = sequelize.define('Mouvement', {
      montant: DataTypes.INTEGER,
      source: DataTypes.INTEGER,
      destination: DataTypes.INTEGER,
      commentaire: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
  }, {});
  Mouvement.associate = function(models) {
    // associations can be defined here
  };
  return Mouvement;
};
