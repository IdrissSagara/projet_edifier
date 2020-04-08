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
    chantierDepart.montant_dispo -= mouvement.montant;
    chantierDestination.montant_dispo += mouvement.montant;

    chantierDestination.update(chantierDestination).then((res) => {

    }).catch((err) => {
        //cancel all the transaction
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });

    chantierDepart.update(chantierDepart).then((res) => {

    }).catch((err) => {
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });

    let mres = await mvtDao.save(mouvement).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });

    if (mres.status === 'error') {
        return res.status(500).json(mres);
    }

    return res.status(200).json(mres);
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

function update(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }
    var mouvement = {
        id: req.body.id,
        source: req.body.source,
        destination: req.body.destination,
        commentaire: req.body.commentaire,
        montant: req.body.montant
    };

    models.Mouvement.findByPk(mouvement.id).then((mouvementFound) => {
        if (!mouvementFound) {
            return res.status(404).json({
                'error': 'no mouvement found with ' + mouvement.id
            })
        }

        mouvementFound.update(mouvement).then((mouvementUpdated) => {
            if (mouvementUpdated) {
                return res.status(200).json(mouvementUpdated);
            } else {
                return res.status(403).json({
                    'message': 'cannot update the mouvement'
                })
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json(err.errors);
        })
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
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
    save, getAll, update, destroy, getMouvement
};