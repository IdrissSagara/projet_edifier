var models = require('../../models');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const JWT_SIGN_SECRET = 'cl3 de ch1ffr3m3nt_JWT';

function login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var username = req.body.username;
    var password = req.body.password;

    models.User.findOne({
        where: {username: username}
    }).then((userFound) => {
        if (!userFound) {
            return res.status(404).json({
                'error': 'no user found with username ' + username
            });
        }

        bcrypt.compare(password, userFound.password, (errBcrypt, resBcrypt) => {
            if (errBcrypt) {
                return res.status(403).json({
                    'error': 'invalid password'
                })
            }

            return res.status(200).json({
                'id': userFound.id,
                'token': genToken(userFound)
            });
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

function genToken(userData) {
    return jwt.sign({
        userId: userData.id,
        role: userData.role
    },
    JWT_SIGN_SECRET,
    {
        expiresIn: '3d'
    })
}

module.exports = {
    login,
}