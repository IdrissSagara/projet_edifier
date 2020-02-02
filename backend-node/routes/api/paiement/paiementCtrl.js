//let paiement = require('../../../models').Paiement;
let models = require('../../../models');
let sequelize = require('sequelize');
const { validationResult } = require('express-validator');

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

    models.Chantier.findOne({
        where: {id: id}
    }).then((chantierFound) => {
        if (!chantierFound) {
            return res.status(404).json({
                'error': 'no chantier found for id ' + id
            });
        }

        let fields = req.query.fields;
        let offset = parseInt(req.query.limit);
        let limit = parseInt(req.query.offset);
        let order = req.query.order;

        models.Paiement.findAll({
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

        let cout = chantierFound.cout;
        console.log('\n\n' + cout + '\n\n');
        let date_paiement = req.body.date_paiement;
        let montant = req.body.montant;
        let type = req.body.type;
        let commentaire = req.body.commentaire;
        
        //sum up the paiement
        models.Paiement.findAll({
            where: {chantierId: id},
            attributes: [
                'id',
                [sequelize.fn('sum', sequelize.col('montant')), 'total_amount'],
            ],
            group: ['id'],
        }).then(p => {
            if (p.total_amount == null) {
                console.log('setting a default value for total_amount');
                p.total_amount = 0;
            }
            console.log('\n\n' + p.total_amount + '\n\n');
            console.log(p);
            let montant_restant = cout - (p.total_amount + montant);

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
                chantierId: chantierFound.id,
            }).then((newPaiement) => {
                if (!newPaiement) {
                    return res.status(500).json({
                        'err': 'couldn\'t post paiement to chantier '+id
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
function getById() {}
function update() {}
function destroy() {}

module.exports = {
    save, getAll, getById, update, destroy
};
