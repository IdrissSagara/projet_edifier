'use strict';
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       nom:
 *         type: string
 *       prenom:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       role:
 *         type: string
 *         format: password
 *       required:
 *         - nom
 *         - prenom
 *         - username
 *         - password
 *         - role
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'basic-user', 'medium-user', 'advanced-user')
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};