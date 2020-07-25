'use strict';

/**
 * @swagger
 * definitions:
 *   Chantier:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       nom:
 *         type: string
 *       prenom:
 *         type: string
 *       telephone:
 *         type: string
 *       type:
 *         type: string
 *       required:
 *         - nom
 *         - prenom
 *         - telephone
 *         - type
 */
module.exports = (sequelize, DataTypes) => {
  const Ouvrier = sequelize.define('Ouvrier', {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      telephone: DataTypes.STRING,
      type: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
  }, {});
  Ouvrier.associate = function(models) {
    // associations can be defined here
    models.Ouvrier.hasMany(models.ChantierOuvrier);
  };
  return Ouvrier;
};