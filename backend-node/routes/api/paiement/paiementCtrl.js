//let paiement = require('../../../models').Paiement;
let models = require('../../../models');
let chantierDAO = require('../../../dao/chantierDao');
let paiementDAO = require('../../../dao/paiementDao');
let sequelize = require('sequelize');
const { validationResult } = require('express-validator');

function getVeryAll(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    models.Paiement.findAndCountAll().then((paiements) => {
        if (!paiements) {
            return res.status(404).json({
                'error': 'no paiement found'
            });
        }

        return res.status(200).json(paiements);
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

/**
 * This method gets all the paiements for a chantier.
 * It looks for the chantier which id was passed in param
 * then looks for all the paiements that belong to this chantier
 * with server side paging using offset and limit
 * @param req
 * @param res
 * @param next
 */
function getAll(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    let id = req.params.id;

    models.Chantier.findByPk(id).then((chantierFound) => {
        if (!chantierFound) {
            return res.status(404).json({
                'error': 'no chantier found for id ' + id
            });
        }

        let fields = req.query.fields;
        let offset = parseInt(req.query.limit);
        let limit = parseInt(req.query.offset);
        let order = req.query.order;

        models.Paiement.findAndCountAll({
            where: {chantierId: id},
            order: [(order != null) ? order.split(':'): ['date_paiement', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(';') : null,
            limit: (!isNaN(limit) ? limit : 10),
            offset: (!isNaN(offset) ? offset : null)
        }).then((paiementsFound) => {
            if (!paiementsFound) {
                return res.status(404).json({
                    'error': 'no paiement found for chantier '+id
                });
            }

            return res.status(200).json(paiementsFound);

        }).catch((err) => {
            console.error(err);
            return res.status(500).json(err.errors);
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

function save(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    let id = req.params.id;
    models.Chantier.findByPk(id).then((chantierFound) => {
        if (!chantierFound) {
            return res.status(404).json({
                'error': 'no chantier found for id ' + id
            });
        }

        let cout = parseFloat(chantierFound.cout);
        let montant = parseFloat(req.body.montant);
        let date_paiement = req.body.date_paiement;
        let type = req.body.type;
        let commentaire = req.body.commentaire;
        
        //sum up the earlier paiements
        models.Paiement.findAll({
            where: {chantierId: chantierFound.id},
            attributes: [
                'id',
                [sequelize.fn('sum', sequelize.col('montant')), 'total_amount'],
            ],
            group: ['id'],
            raw: true
        }).then(p => {
            let total_amount = 0;
            p.map(i => {
                return total_amount += parseFloat(i.total_amount);
            });
            let montant_restant = cout - (total_amount + montant);

            if (montant_restant < 0) {
                return res.status(400).json({
                    'err': 'Cannot process to paiement due to negative montant_restant'
                });
            }

            models.Paiement.create({
                date_paiement: (date_paiement != null ) ? date_paiement : new Date(),
                montant: montant,
                montant_restant: montant_restant,
                type: type,
                commentaire: commentaire,
                ChantierId: chantierFound.id,
            }).then((newPaiement) => {
                if (!newPaiement) {
                    return res.status(500).json({
                        'err': 'couldn\'t add paiement to chantier '+id
                    });
                }

                return res.status(201).json(newPaiement);

            }).catch((err) => { //creation errors
                console.error(err);
                return res.status(500).json(err.errors);
            });
        }).catch((err) => { //getAll errors
            console.error(err);
            return res.status(500).json(err.errors);
        });
    }).catch((err) => { //getByPk
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

function getById(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    let id_chantier = req.params.id_chantier;
    let id_paiement = req.params.id_paiement;
    models.Chantier.findByPk(id_chantier).then((chantierFound) => {
        if (!chantierFound) {
            return res.status(404).json({
                'error': 'no chantier found for id ' + id_chantier
            });
        }

        models.Paiement.findOne({
            where: {
                chantierId: chantierFound.id,
                id: id_paiement
            }
        }).then((paiement_found) => {
            if (!paiement_found) {
                return res.status(404).json({
                    'error': 'no paiement found with id ' + id_paiement
                        + ' for the chantier ' + id_chantier
                });
            }

            return res.status(200).json(paiement_found);

        }).catch((err) => { //paiement.findByPk errors
            console.error(err);
            return res.status(500).json(err.errors);
        });
    }).catch((err) => { //chantier.findByPk errors
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

function update() {}

async function destroy(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 'error',
            message: errors.array()
        });
    }

    let id_paiement = req.params.id;

    let paiement_found = await paiementDAO.getPaiementById(id_paiement).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });

    if (!paiement_found) {
        return res.status(404).json({
            status: 'error',
            message: 'no paiement found with id ' + id_paiement
        });
    }

    let destroyedPaiement = paiementDAO.destroy(paiement_found).catch(err => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });

    if (!destroyedPaiement) {
        return res.status(403).json({
            status: 'error',
            message: 'cannot delete paiement with id ' + id_paiement
        });
    }

    //remettre la somme qui vient d'etre supprimée
    return res.status(200).json({
        status: "success",
        message: 'Paiement with id ' + id_paiement + ' deleted'
    });
}

module.exports = {
    save, getAll, getVeryAll, getById, update, destroy
};
