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

module.exports = {
    getByUsername, pwdCompare
};
