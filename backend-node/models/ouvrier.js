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
    models.Chantier.belongsToMany(models.Ouvrier, {
      through: 'ChantierOuvrier',
      as: 'chantiers',
      foreignKey: 'OuvrierId',
      otherKey: 'ChantierId'
    });
  };
  return Ouvrier;
};