'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChantierOuvrier = sequelize.define('ChantierOuvrier', {
    idChantier: DataTypes.INTEGER,
    idOuvrier: DataTypes.INTEGER
  }, {});
  ChantierOuvrier.associate = function(models) {
    // associations can be defined here
  };
  return ChantierOuvrier;
};