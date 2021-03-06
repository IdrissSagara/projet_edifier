var ouvrierModel = require('../../../models').Ouvrier;
const ouvrierDao = require('../../../dao/ouvrierDao');
const chantierDao = require('../../../dao/chantierDao');
const {validationResult} = require('express-validator');

/**
 *
 * @param {*} req
 * @param {*} res
 */
function save(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const ouvrier = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        type: req.body.type,
        updatedBy: req.user.userId,
        createdBy: req.user.userId,
    };

    ouvrierModel.findOne({
        where: {telephone: ouvrier.telephone}
    }).then((ouvrierFound) => {
        if (ouvrierFound) {
            return res.status(400).json({
                'error': 'Un ouvrier avec le même numéro de téléphone existe déjà'
            });
        }

        ouvrierModel.create(ouvrier).then((newOuvrier) => {
            if (newOuvrier) {
                return res.status(201).json(newOuvrier);
            } else {
                return res.status(500).json({
                    err: 'Impossible d\'enregistrer l\'ouvrier'
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json(err.errors);
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

function getAll(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var fields = req.query.fields;
    var offset = parseInt(req.query.limit);
    var limit = parseInt(req.query.offset);
    var order = req.query.order;

    ouvrierModel.findAndCountAll({
        order: [(order != null) ? order.split(':') : ['nom', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(';') : null,
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),
    }).then((ouvrierFound) => {
        if (ouvrierFound) {
            return res.status(200).json(ouvrierFound);
        } else {
            return res.status(404).json({
                error: 'Ouvrier trouvé'
            })
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors)
    });
}

function getById(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var id = req.params.id;

    ouvrierModel.findOne({
        where: {id: id}
    }).then((ouvrierFound) => {
        if (ouvrierFound) {
            return res.status(200).json(ouvrierFound);
        } else {
            return res.status(404).json({
                message: 'Aucun ouvrier trouvé avec l\'id ' + id
            })
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors)
    });
}

function update(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const ouvrier = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        type: req.body.type,
        updatedBy: req.user.userId,
    };

    ouvrierModel.findByPk(ouvrier.id).then((ouvrierFound) => {
        if (!ouvrierFound) {
            return res.status(404).json({
                error: 'Aucun ouvrier trouvé avec l\'id ' + ouvrier.id
            })
        }

        ouvrierFound.update(ouvrier).then((updatedOuvrier) => {
            if (updatedOuvrier) {
                return res.status(200).json(updatedOuvrier)
            } else {
                return res.status(403).json({
                    message: 'Impossible de mettre à jour l\'ouvrier'
                })
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json(err.errors);
        });
    })
}

function destroy(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var id = req.params.id;

    ouvrierModel.findByPk(id).then((ouvrierFound) => {
        if (!ouvrierFound) {
            return res.status(404).json({
                error: 'Aucun ouvrier trouvé avec l\'id ' + id
            })
        }

        ouvrierFound.destroy().then((destroyedOuvrier) => {
            if (destroyedOuvrier) {
                return res.status(200).json({
                    id: destroyedOuvrier.id,
                    message: 'ouvrier ' + id + ' supprimé'
                })
            } else {
                return res.status(403).json({
                    error: 'Impossible de supprimer l\'ouvrier avec l\'id ' +id
                })
            }
        })

    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

async function affect(req, res) {
    const affectation = {
        OuvrierId: req.params.id,
        ChantierId: req.query.idChantier,
        updatedBy: req.user.userId,
        createdBy: req.user.userId,
    };

    let chantier = await chantierDao.getChantierById(affectation.ChantierId);
    if (!chantier) {
        return res.status(400).json({
            message: 'no chantier found with id ' + affectation.ChantierId
        });
    }

    if (chantier.status === 'error') {
        return res.status(500).json(chantier);
    }

    let ouvrier = await ouvrierDao.getById(affectation.OuvrierId);
    if (!ouvrier) {
        return res.status(404).json({
            message: 'no ouvrier found with id ' + affectation.OuvrierId
        });
    }

    if (ouvrier.status === 'error') {
        return res.status(500).json(ouvrier);
    }

    let affection = await ouvrierDao.affecterAChantier(affectation);

    if (affection.status === 'error') {
        return res.status(500).json(affection);
    }

    return res.status(201).json(affection);
}

async function getChantiersOfOuvrier(req, res) {
    const id = req.params.id;

    let ouvrier = await ouvrierDao.getChantiersOfOuvrier(id);

    if (!ouvrier) {
        return res.status(404).json({
            message: 'no ouvrier found with id ' + id
        });
    }

    if (ouvrier.status === 'error') {
        return res.status(500).json(ouvrier);
    }

    return res.status(200).json(ouvrier);
}

module.exports = {
    save, getAll, getById, update, destroy, affect, getChantiersOfOuvrier
};
