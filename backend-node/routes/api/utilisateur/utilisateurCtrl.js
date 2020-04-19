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

    let users = await userDao.getAll(fields, offset, limit, order).catch((err) => {
        return res.status(500).json({
            status: 'error',
            message: 'error while getting the users'
        });
    });

    if (users.status === 'error') {
        return res.status(500).json(users);
    }

    return res.status(200).json(users);
}


module.exports = {
    getAll
}