'use strict';
module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        chantier: DataTypes.INTEGER,
        user: DataTypes.INTEGER,
        type: DataTypes.ENUM('chantier', 'user'),
        path: DataTypes.STRING,
        createdBy: DataTypes.INTEGER,
        updatedBy: DataTypes.INTEGER
    }, {});
    Photo.associate = function (models) {
        // associations can be defined here
    };
    return Photo;
};