//let paiement = require('../../../models').Paiement;
let models = require('../../../models');
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
                    'error': 'no paiement found'
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

function save() {}
function getById() {}
function update() {}
function destroy() {}

module.exports = {
    save, getAll, getById, update, destroy
};