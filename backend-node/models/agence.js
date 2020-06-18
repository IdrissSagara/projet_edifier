module.exports = (sequelize, DataTypes) => {
    const Agence = sequelize.define('Agence', {
        rccm: DataTypes.STRING,
        fiscal: DataTypes.STRING,
        libelle: DataTypes.STRING,
        telephone: DataTypes.STRING,
        fax: DataTypes.STRING,
        mail: DataTypes.STRING,
        adresse: DataTypes.STRING,
        logo: DataTypes.STRING,
        createdBy: DataTypes.INTEGER,
        updatedBy: DataTypes.INTEGER,

    }, {});
    Agence.associate = function (models) {
        // associations can be defined here
    };
    return Agence;
};