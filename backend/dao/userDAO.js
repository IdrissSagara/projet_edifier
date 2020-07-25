let models = require('../models');
let bcrypt = require('bcrypt');

async function getByUsername(username) {
    if (!username)
        return {
            status: 'error',
            message: `Paramètre username introuvable`,
        };

    return models.User.findOne({
        where: {username: username}
    }).catch(err => {
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la récupération de l'utilisateur avec le nom d'utilisateur ` + username,
            details: err
        };
    });
}

function pwdCompare(hashedPwd, pwdClair) {
    return bcrypt.compareSync(pwdClair, hashedPwd);
}

async function save(user) {
    if (!user) {
        return {
            status: 'error',
            message: `Paramètre utilisateur introuvable`,
        };
    }

    return models.User.create(user).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de l'enregistrement de l'utilisateur`,
            details: err
        };
    });
}

async function update(criteria, username) {
    if (!criteria)
        return {
            status: 'error',
            message: `Aucun critère de selection spécifié`,
        };

    return models.User.update(criteria,
        {where: {username: username}}
    ).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la mise à jour de l'utilisateur`,
            details: err
        };
    });
}

async function destroy(username) {
    if (!username)
        return null;

    return models.User.delete({
        where: {username: username}
    }).catch(err => {
        console.error(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la suppression de l'utilisateur`,
            details: err
        };
    });
}


async function getAll(fields, offset, limit, order) {
    return models.User.findAndCountAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
        attributes: ['id', 'nom', 'prenom', 'username', 'role', 'createdAt', 'updatedAt'],
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),
    }).catch(err => {
        console.error(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la récupération des utilisateurs`,
            details: err
        };
    });
}

async function getById(id) {
    return models.User.findByPk(id).catch(err => {
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la récupération de l'utilisateur avec l'identifiant ` + id,
            details: err
        };
    });
}

async function updateUser(user) {
    return models.User.update({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            username: user.username,
            role: user.role
        },
        {
            where: {id: user.id}
        }).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la mise à jour de l'utilisateur`,
            details: err
        };
    });
}

async function getCount(distinct = true) {
    return models.User.count({distinct: distinct}).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la récupération du nombre d'utilisateurs`,
            details: err.errors
        }
    })
}

module.exports = {
    getByUsername, pwdCompare, save, update, destroy, getAll, getById, updateUser, getCount
};
