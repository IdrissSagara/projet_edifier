'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChantierOuvrier = sequelize.define('ChantierOuvrier', {
    ChantierId: DataTypes.INTEGER,
    OuvrierId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
  }, {});
  ChantierOuvrier.associate = function(models) {
    // associations can be defined here
    models.ChantierOuvrier.belongsTo(models.Chantier);
    models.ChantierOuvrier.belongsTo(models.Ouvrier);
  };
  return ChantierOuvrier;
};