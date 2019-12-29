'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mouvement = sequelize.define('Mouvement', {
    date_mouvement: DataTypes.DATE,
    montant: DataTypes.INTEGER,
    source: DataTypes.INTEGER,
    destination: DataTypes.INTEGER,
    type: DataTypes.STRING,
    commentaire: DataTypes.STRING,
    idChantier: DataTypes.INTEGER
  }, {});
  Mouvement.associate = function(models) {
    // associations can be defined here
    models.Mouvement.belongsTo(models.Chantier);
  };
  return Mouvement;
};