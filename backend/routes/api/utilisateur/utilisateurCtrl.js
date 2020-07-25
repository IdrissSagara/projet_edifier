var models = require('../../../models');
const {validationResult} = require('express-validator');
const userDao = require('../../../dao/userDAO');

async function getAll(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    let fields = req.query.fields;
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    let users = await userDao.getAll(fields, offset, limit, order);

    if (!users) {
        return res.status(404).json({
            status: 'error',
            message: `Aucun utilisateur trouvé`
        });
    }

    if (users.status === 'error') {
        return res.status(500).json(users);
    }

    return res.status(200).json(users);
}

async function getUserById(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    var id = req.params.id;

    let user = await userDao.getById(id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: `Aucun utilisateur trouvé avec l'identifiant ` + id
        });
    }

    if (user.status === 'error') {
        return res.status(500).json(user);
    }
    return res.status(200).json(user);
}

async function updateUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }
    var user = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        username: req.body.username,
        role: req.body.role
    };

    //var id = req.params.id;
    let userUpdated = await userDao.updateUser(user);

    if (userUpdated.status === 'error') {
        return res.status(500).json(user);
    }

    return res.status(200).json(user);
}

async function whoAmI(req, res) {
    let user = req.user;
    delete user.isAuth;
    return res.status(200).json(user);
}

function destroy(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    var id = req.params.id;

    models.User.findByPk(id).then((userFound) => {
        if (!userFound) {
            return res.status(404).json({
                status: 'error',
                message: `Aucun Utilisateur trouvé avec l'identifiant ` + id
            })
        }

        userFound.destroy().then((UserDestroyed) => {
            if (UserDestroyed) {
                return res.status(200).json(UserDestroyed)
            } else {
                return res.status(403).json({
                    status: 'error',
                    message: `Impossible de supprimer l'utilisateur avec l'identifiant ` + id
                })
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({
                status: 'error',
                message: 'Une erreur interne est survenue lors de la suppression du client',
                details: err.errors
            });
        });

    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération de l\'utilisateur',
            details: err.errors
        });
    });

}

module.exports = {
    getAll, getUserById, updateUser, whoAmI, destroy
};
