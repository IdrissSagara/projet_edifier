let models = require('../models');
let bcrypt = require('bcrypt');

async function getByUsername(username) {
    if (!username)
        return null;

    return models.User.findOne({
        where: {username: username}
    });
}

function pwdCompare(UserFound, password) {
    return bcrypt.compareSync(password, UserFound.password);
}

async function save(user) {
    if (!user)
        return null;

    return models.User.create(user);
}

async function destroy(username) {
    if (!username)
        return null;

    return models.User.delete({
        where: {username: username}
    })
}

module.exports = {
    getByUsername, pwdCompare, save
};
