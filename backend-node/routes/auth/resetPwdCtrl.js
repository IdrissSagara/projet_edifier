var models = require('../../models');
var bcrypt = require('bcrypt');
var jwtUtils = require('./jwtUtils');
const {validationResult} = require('express-validator');
const config = require('../../config/jwt_config');
const SALT_FACTOR = config.salt_factor;
let userDao = require('../../dao/userDAO');

async function resetPwd(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let userFound = await userDao.getByUsername(username).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });

    if (!userFound) {
        return res.status(404).json({
            error: 'no user found with username ' + username
        });
    }

    if (!userDao.pwdCompare(userFound.password, oldPassword)) {
        return res.status(403).json({
            error: 'invalid old password'
        });
    }

    if (userDao.pwdCompare(userFound.password, newPassword)) {
        return res.status(400).json({
            message: 'The old and the new password are identical'
        });
    }

    let hashedPwd = bcrypt.hashSync(newPassword, SALT_FACTOR);
    let user = await userDao.update(
        {password: hashedPwd}, userFound.username
    ).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });

    if (!user) {
        return res.status(500).json({
            error: `user could not be modified`
        })
    }

    //regen a token to keep user logged in the front side
    userFound.password = hashedPwd;
    let token = jwtUtils.genToken(userFound);
    return res.status(200).json({
        message: "Password successfully modified",
        token: token
    });
}

module.exports = {
    resetPwd
};
