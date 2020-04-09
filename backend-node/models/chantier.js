'use strict';
/**
 * @swagger
 * definitions:
 *   Chantier:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       emplacement:
 *         type: string
 *       cout:
 *         type: integer
 *       date_debut:
 *         type: string
 *         format: date-time
 *       date_fin:
 *         type: string
 *         format: date-time
 *       walita:
 *         type: integer
 *       yereta:
 *         type: integer
 *       montant_dispo:
 *         type: integer
 *       required:
 *         - emplacement
 *         - cout
 *         - date_debut
 */
module.exports = (sequelize, DataTypes) => {
  const Chantier = sequelize.define('Chantier', {
    emplacement: DataTypes.STRING,
    cout: DataTypes.INTEGER,
    date_debut: DataTypes.DATE,
    date_fin: DataTypes.DATE,
    walita: DataTypes.INTEGER,
    yereta: DataTypes.INTEGER,
    montant_dispo: DataTypes.INTEGER
  }, {});
  Chantier.associate = function(models) {
    // associations can be defined here
    models.Chantier.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Chantier.hasMany(models.ChantierOuvrier);
    models.Chantier.hasMany(models.Facture);
    models.Chantier.hasMany(models.Paiement);
  };
  return Chantier;
};