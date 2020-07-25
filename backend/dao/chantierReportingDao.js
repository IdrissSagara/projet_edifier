const models = require('../models');
const sequelize = require('sequelize');

async function getCount(distinct = true) {
    return models.Chantier.count({distinct: distinct}).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération du nombre de chantiers',
            details: err.errors
        }
    })
}

async function getNotCompleted() {
    return models.Chantier.findAndCountAll({
        where: {date_fin: null},
        attributes: ['id']
    }).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération des chantiers non terminés',
            details: err.errors
        }
    })
}

async function getCompleted() {
    return models.Chantier.findAndCountAll({
        where: {
            [sequelize.Op.not]: [
                {date_fin: null}
            ]
        },
        attributes: ['id']
    }).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération des chantiers terminés',
            details: err.errors
        }
    })
}

async function getNotfullyPaid() {
    return models.sequelize.query(`select chantierId, cout, sum(Paiements.montant) as paid
                                   from Paiements
                                            join Chantiers on chantierId = Chantiers.id
                                   group by chantierId
                                   having paid < (select cout from Chantiers where Chantiers.id = chantierId)`,
        {
            type: sequelize.QueryTypes.SELECT
        }).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération des paiements incomplets',
            details: err.errors
        }
    })
}

async function getNoPaiementAtAll() {
    return models.sequelize.query(`select id
                                   from Chantiers
                                   where id not in (select chantierId from Paiements)`,
        {
            type: sequelize.QueryTypes.SELECT
        }).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération des paiements incomplets',
            details: err.errors
        }
    })
}

module.exports = {
    getCount, getNotCompleted, getCompleted, getNotfullyPaid, getNoPaiementAtAll
};
