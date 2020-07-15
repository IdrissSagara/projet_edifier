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

    let userFound = await userDao.getByUsername(username);

    if (!userFound) {
        return res.status(404).json({
            status: 'error',
            message: `Aucun utilisateur trouvé avec le nom d'utilisateur ` + username
        });
    }

    if (userFound.status === 'error') {
        return res.status(500).json(userFound);
    }

    if (!userDao.pwdCompare(userFound.password, oldPassword)) {
        return res.status(403).json({
            error: `Ancien mot de passe invalide`
        });
    }

    if (userDao.pwdCompare(userFound.password, newPassword)) {
        return res.status(400).json({
            message: `L'ancien et le nouveau mot de passe doivent être differents`
        });
    }

    let hashedPwd = bcrypt.hashSync(newPassword, SALT_FACTOR);
    let user = await userDao.update(
        {password: hashedPwd}, userFound.username
    );

    if (!user) {
        return res.status(500).json({
            status: 'error',
            message: `Impossible de modifier l'utilisateur`
        })
    }

    if (user.status === 'error') {
        return res.status(500).json(user);
    }

    //regen a token to keep user logged in the front side
    userFound.password = hashedPwd;
    let token = jwtUtils.genToken(userFound);
    return res.status(200).json({
        message: `Mot de passe modifié avec succès`,
        token: token
    });
}

module.exports = {
    resetPwd
};
