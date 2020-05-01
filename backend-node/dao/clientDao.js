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

async function getChantierofClient(id) {
    return models.sequelize.query("select Chantiers.* from Chantiers join Clients C on Chantiers.clientId = C.id where C.id = ?",
        {
            replacements: [id],
            type: models.sequelize.QueryTypes.SELECT
        });
}

module.exports = {
    search, getChantierofClient,
};

