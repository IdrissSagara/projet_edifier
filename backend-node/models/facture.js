'use strict';
module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define('Facture', {
    date_etablissement: DataTypes.DATE,
    montant: DataTypes.INTEGER,
    idChantier: DataTypes.INTEGER
  }, {});
  Facture.associate = function(models) {
    // associations can be defined here
    models.Facture.belongsTo(models.Chantier);
  };
  return Facture;
};