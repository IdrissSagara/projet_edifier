'use strict';

/**
 * @swagger
 * definitions:
 *   Chantier:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       date_etablissement:
 *         type: string
 *         format: date-time
 *       montant:
 *         type: integer
 *       idChantier:
 *         type: integer
 *       required:
 *         - nom
 *         - prenom
 *         - telephone
 */
module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define('Facture', {
    date_etablissement: DataTypes.DATE,
    montant: DataTypes.INTEGER,
      idChantier: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
  }, {});
  Facture.associate = function(models) {
    // associations can be defined here
    models.Facture.belongsTo(models.Chantier);
  };
  return Facture;
};