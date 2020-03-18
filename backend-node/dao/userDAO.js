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

module.exports = {
    getByUsername, pwdCompare, save, update, destroy
};
