var models = require('../../models');
var bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const config = require('../../config/jwt_config');
const SALT_FACTOR = config.salt_factor;

function register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

    models.User.findOne({
        where: {username: username}
    }).then((userFound) => {
        if (userFound) {
            return res.status(403).json({
                'message': 'a user already exists with the username ' + username
            });
        }

        bcrypt.hash(password, SALT_FACTOR, (err, bcryptedPwd) => {
            models.User.create({
                nom: nom,
                prenom: prenom,
                username: username,
                password: bcryptedPwd,
                role: role,
            }).then((userCreated) => {
                if (!userCreated) {
                    return res.status(401).json({
                        'message': 'can\'t return the user created'
                    });
                }
    
                return res.status(201).json(userCreated);
            }).catch((err) => {
                console.error(err);
                return res.status(500).json(err.errors);
            });
        });
        
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

module.exports = {
    register,
};
