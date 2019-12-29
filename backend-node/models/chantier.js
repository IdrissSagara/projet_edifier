'use strict';
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
    models.Chantier.belongsToMany(models.Ouvrier, {
      through: 'ChantierOuvrier',
      as: 'ouvriers',
      foreignKey: 'ChantierId',
      otherKey: 'OuvrierId'
    });
    models.Chantier.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Chantier.hasMany(models.Facture);
    models.Chantier.hasMany(models.Mouvement);
    models.Chantier.hasMany(models.Paiement);
  };
  return Chantier;
};