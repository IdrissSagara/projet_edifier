var models = require('../../models');
var bcrypt = require('bcrypt');
var jwtUtils = require('./jwtUtils');
const { validationResult } = require('express-validator');

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
                'token': jwtUtils.genToken(userFound)
            });
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

function isAuthenticated(req) {
    var obj = {
        isAuth: false,
        role: '',
        userId: -1,
    };

    obj = jwtUtils.getUserId(req.headers['authorization']);
    
    if (obj.userId != -1) {
        obj.isAuth = true;
    }

    return obj;
}

module.exports = {
    login, isAuthenticated
}