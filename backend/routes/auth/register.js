let userDao = require('../../dao/userDAO');
let bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const config = require('../../config/jwt_config');
const SALT_FACTOR = config.salt_factor;

async function register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        role: req.body.role
    };

    let userFound = await userDao.getByUsername(user.username);

    if (userFound && userFound.status === 'error') {
        return res.status(500).json(userFound);
    }

    if (userFound && userFound.username) {
        return res.status(403).json({
            status: 'error',
            message: `Un utilisateur possède déjà le nom d'utilisateur ` + user.username
        });
    }

    //save the user with its pwd hashed
    user.password = bcrypt.hashSync(user.password, SALT_FACTOR);
    let userCreated = await userDao.save(user);

    if (!userCreated) {
        return res.status(401).json({
            status: 'error',
            message: `Impossible d'enregistrer l'utilisateur`
        });
    }

    if (userCreated && userCreated.status === 'error') {
        return res.status(500).json(userCreated)
    }

    return res.status(201).json(userCreated);
}

module.exports = {
    register,
};
