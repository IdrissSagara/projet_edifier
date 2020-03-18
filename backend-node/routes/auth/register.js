let models = require('../../models');
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

    let userFound = await userDao.getByUsername(user.username).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });

    if (userFound) {
        return res.status(403).json({
            'message': 'a user already exists with the username ' + user.username
        });
    }

    //save the user with its pwd hashed
    user.password = bcrypt.hashSync(user.password, SALT_FACTOR);
    let userCreated = await userDao.save(user).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });

    if (!userCreated) {
        return res.status(401).json({
            'message': 'can\'t return the user created'
        });
    }

    return res.status(201).json(userCreated);
}

module.exports = {
    register,
};
