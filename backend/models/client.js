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
 *       required:
 *         - nom
 *         - prenom
 *         - telephone
 */
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      telephone: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
    models.Client.hasMany(models.Chantier);
  };
  return Client;
};