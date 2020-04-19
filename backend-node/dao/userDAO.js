let models = require('../models');
let bcrypt = require('bcrypt');

async function getByUsername(username) {
    if (!username)
        return null;

    return models.User.findOne({
        where: {username: username}
    });
}

function pwdCompare(hashedPwd, pwdClair) {
    return bcrypt.compareSync(pwdClair, hashedPwd);
}

async function save(user) {
    if (!user)
        return null;

    return models.User.create(user);
}

async function update(criteria, username) {
    if (!criteria)
        return null;

    return models.User.update(criteria,
        {where: {username: username}}
    );
}

async function destroy(username) {
    if (!username)
        return null;

    return models.User.delete({
        where: {username: username}
    })
}


async function getAll(fields, offset, limit, order) {

    return models.User.findAndCountAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
        attributes: ['id', 'nom', 'prenom', 'username', 'createdAt', 'updatedAt'],
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),
    }).catch(err => {
        console.error(err);
        return {
            status: 'error',
            message: 'An error occured when get Users'
        };
    });
}

module.exports = {
    getByUsername, pwdCompare, save, update, destroy, getAll
};
