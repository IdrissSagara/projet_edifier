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
        createdBy: req.user.userId,
        updatedBy: req.user.userId,
    };

    let chantierDepart = await chantierDao.getChantierById(mouvement.source);

    if (!chantierDepart) {
        return res.status(400).json({
            status: 'error',
            message: `Le chantier source dont l'id est ` + mouvement.source + ` est introuvable`
        })
    }

    let chantierDestination = await chantierDao.getChantierById(mouvement.destination);

    if (!chantierDestination) {
        return res.status.json({
            status: 'error',
            message: `Le chantier source dont l'id est ` + mouvement.destination + ` est introuvable`
        })

    }

    if ((chantierDepart.montant_dispo - mouvement.montant) <= 0) {
        return res.status(400).json({
            status: 'error',
            message: `Le montant a transferer est plus grand que le montant disponible dans le chantier ` + mouvement.source
        });
    }

    chantierDepart.updatedBy = mouvement.createdBy;
    chantierDestination.updatedBy = mouvement.createdBy;

    //transaction
    chantierDepart.montant_dispo = parseInt(chantierDepart.montant_dispo) - parseInt(mouvement.montant);
    chantierDestination.montant_dispo = parseInt(chantierDestination.montant_dispo) + parseInt(mouvement.montant);
    chantierDestination.walita = parseInt(chantierDestination.walita) + parseInt(mouvement.montant);

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
            message: `Impossible d'enregistrer le mouvement`,
            details: e.errors,
        });
    }
}

async function getAll(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    let fields = req.query.fields;
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    let mvts = await mvtDao.getAll(fields, offset, limit, order);

    if (!mvts) {
        return res.status(404).json({
            status: 'error',
            message: `Aucun mouvement trouvé`
        })
    }

    if (mvts.status === 'error') {
        return res.status(500).json(mvts);
    }

    return res.status(200).json(mvts);
}

async function getById(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    var id = req.params.id;

    let mvts = await mvtDao.getById(id);

    if (!mvts) {
        return res.status(404).json({
            status: 'error',
            message: `Aucun mouvement trouvé avec l'identifiant ` + id
        })
    }

    if (mvts.status === 'error') {
        return res.status(500).json(mvts);
    }

    return res.status(200).json(mvts);
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
                status: 'error',
                message: `Aucun mouvement trouvé avec l'identifiant ` + id
            })
        }

        mouvementFound.destroy().then((mouvementDestroyed) => {
            if (mouvementDestroyed) {
                return res.status(200).json({
                    message: `Le mouvement avec l'identifiant ` + id + ' a été supprimé'
                })
            } else {
                return res.status(403).json({
                    status: 'error',
                    message: `Impossible de supprimer le mouvement avec l'identifiant ` + id
                })
            }
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la suppression du mouvement',
            details: err.errors
        });
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
                status: 'error',
                message: `Aucun mouvement trouvé`
            });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du mouvement',
            details: err.errors
        });
    });
}


module.exports = {
    save, getAll, destroy, getMouvement, getById
};