var models = require('../models');

async function getAll(fields, offset, limit, order) {
    return models.Mouvement.findAndCountAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(';') : null,
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),
    }).catch(err => {
        console.error(err);
        return {
            status: 'error',
            message: 'An error occured when get mouvements'
        };
    });
}

async function getById(id) {
    return models.Mouvement.findOne({
        where: {id: id}
    }).catch(err => {
        console.error(err);
        return {
            status: 'error',
            message: 'An error occured when get mouvements'
        };
    });
}

async function save(mouvement, transaction) {
    return models.Mouvement.create({
        source: mouvement.source,
        destination: mouvement.destination,
        commentaire: mouvement.commentaire,
        montant: mouvement.montant
    }, {transaction: transaction}).catch(err => {
        console.error(err);
        return {
            status: 'error',
            message: 'An error occured when creating mouvement'
        };
    });
}

module.exports = {
    getById, save, getAll
};
