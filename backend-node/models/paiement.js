'use strict';
module.exports = (sequelize, DataTypes) => {
  const Paiement = sequelize.define('Paiement', {
    date_paiement: DataTypes.DATE,
    montant: DataTypes.INTEGER,
    montant_restant: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    commentaire: DataTypes.STRING,
    idChantier: DataTypes.INTEGER
  }, {});
  Paiement.associate = function(models) {
    // associations can be defined here
    models.Paiement.belongsTo(models.Chantier);
  };
  return Paiement;
};