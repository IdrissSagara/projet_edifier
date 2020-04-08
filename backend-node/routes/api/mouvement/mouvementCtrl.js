var models = require('../../../models');
const mvtDao = require('../../../dao/mouvementDao');
const chantierDao = require('../../../dao/chantierDao');
const {validationResult} = require('express-validator');

async function save(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    let mouvement = {
        montant: req.body.montant,
        source: req.body.source,
        destination: req.body.destination,
        commentaire: req.body.commentaire,
    };

    let chantierDepart = await chantierDao.getChantierById(mouvement.source);

    if (!chantierDepart) {
        return res.status(400).json({
            'error': 'no chantier found with id = ' + mouvement.source
        })
    }

    let chantierDestination = await chantierDao.getChantierById(mouvement.destination);

    if (!chantierDestination) {
        return res.status.json({
            'error': 'no chantier found with id = ' + mouvement.destination
        })

    }

    if ((chantierDepart.montant_dispo - mouvement.montant) <= 0) {
        return res.status(400).json({
            'error': 'montant to move is greater than montant_dispo in chantier ' + mouvement.source
        });
    }

    //transaction
    chantierDepart.montant_dispo = parseInt(chantierDepart.montant_dispo) - parseInt(mouvement.montant);
    chantierDestination.montant_dispo = parseInt(chantierDestination.montant_dispo) + parseInt(mouvement.montant);
    console.log("\n\n");
    console.log("chantierDestination.montant_dispo :" + chantierDestination.montant_dispo);
    console.log("chantierDepart.montant_dispo :" + chantierDepart.montant_dispo);
    console.log("\n\n");

    let transaction = await models.sequelize.transaction({autocommit: false});
    try {
        await chantierDao.update(chantierDestination, transaction);
        await chantierDao.update(chantierDepart, transaction);
        await mvtDao.save(mouvement, transaction);
        await transaction.commit();

        return res.status(200).json(mouvement);
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        return res.status(500).json({
            status: 'error',
            message: e.errors,
        });
    }
}

function getAll(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    var fields = req.query.fields;
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);
    var order = req.query.order;

    models.Mouvement.findAndCountAll({
        order: [(order != null) ? order.split(':') : ['date_mouvement', 'ASC']],
        attributes: (fields != '*' && fields != null) ? fields.split(';') : null,
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),
        include: [{
            model: models.Chantier,
            attributes: ['emplacement', 'cout', 'date_debut', 'date_fin', 'montant_dispo']
        }]
    }).then((mouvement) => {
        if (mouvement) {
            return res.status(200).json(mouvement);
        } else {
            return res.status(404).json({
                'error': 'no mouvement found '
            });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    })
}


function destroy(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    var id = req.params.id;

    models.Mouvement.findByPk(id).then((mouvementFound) => {
        if (!mouvementFound) {
            return res.status(404).json({
                'error': 'no mouvement found with ' + id
            })
        }

        mouvementFound.destroy().then((mouvementDestroyed) => {
            if (mouvementDestroyed) {
                return res.status(200).json({
                    'message': 'mouvement ' + id + ' deleted'
                })
            } else {
                return res.status(403).json({
                    'error': 'cannot delete mouvement with id ' + id
                })
            }
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

function getMouvement(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    var id = req.params.id;

    models.Mouvement.findOne({
        where: {id: id},
        include: [{
            model: models.Chantier,
            attributes: ['emplacement', 'cout', 'date_debut', 'date_fin', 'montant_dispo']
        }]
    }).then((mouvementrFound) => {
        if (mouvementrFound) {
            return res.status(200).json(mouvementrFound);
        } else {
            return res.status(404).json({
                'error': 'no mouvement found '
            });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}


module.exports = {
    save, getAll, destroy, getMouvement
};