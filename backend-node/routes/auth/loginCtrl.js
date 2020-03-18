var models = require('../../models');
var bcrypt = require('bcrypt');
var jwtUtils = require('./jwtUtils');
const { validationResult } = require('express-validator');

let userDao = require('../../dao/userDAO');

async function loginCtrl(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    let username = req.body.username;
    let password = req.body.password;

    let userFound = await userDao.getByUsername(username).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });

    if (!userFound) {
        return res.status(404).json({
            'error': 'no user found with username ' + username
        });
    }

    let authed = userDao.pwdCompare(userFound.password, password);

    if (!authed) {
        return res.status(403).json({
            'error': 'invalid password'
        });
    }

    userFound.password = undefined;
    return res.status(200).json({
        'user': userFound,
        'token': jwtUtils.genToken(userFound)
    });
}

function isAuthenticated(req) {
    let user = {
        isAuth: false,
        userId: -1,
        nom: "",
        prenom: "",
        username: "",
        createdAt: "",
        updatedAt: "",
        role: ""
    };

    user = jwtUtils.getUserInfo(req.headers['authorization']);

    (user.userId !== -1) ? user.isAuth = true : user.isAuth = false;

    return user;
}

module.exports = {
    loginCtrl, isAuthenticated
};
