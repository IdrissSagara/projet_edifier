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
            message: `Impossible de trouver des noms de clients avec ` + nom,
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

async function getCount(distinct = true) {
    return models.Client.count({distinct: distinct}).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération du nombre de clients',
            details: err.errors
        }
    })
}

module.exports = {
    search, getChantierofClient, getCount
};

