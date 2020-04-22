var models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function search(nom) {
    return models.Client.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    nom: {[Op.like]: '%' + nom + '%'}
                },
                {
                    prenom: {[Op.like]: '%' + nom + '%'}
                }
            ]
        }
    }).catch((err) => {
        return {
            status: 'error',
            message: 'cannot get clients who names like ' + nom,
            details: err.errors
        };
    });
}

module.exports = {
    search
};
