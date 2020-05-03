var models = require('../../../models');
const chantierDao = require('../../../dao/chantierDao');
const { validationResult } = require('express-validator');

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

    let chantier = {
        ClientId: req.body.ClientId,
        emplacement: req.body.emplacement,
        cout: req.body.cout,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin || null,
        walita: req.body.walita || 0,
        yereta: req.body.yereta || req.body.montant_dispo,
        montant_dispo: req.body.montant_dispo,
        createdBy: req.user.userId,
        updatedBy: req.user.userId
    };

    models.Client.findOne({
        where: {id: chantier.ClientId}
    }).then((clientFound) => {
        if (clientFound) {
            models.Chantier.create(chantier).then((newChantier) => {
                if (newChantier) {
                    return res.status(201).json(newChantier);
                } else {
                    return res.status(500).json({
                        status: 'error',
                        message: `Impossible d'enregistrer le chantier`
                    });
                }
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({
                    status: 'error',
                    message: err.errors
                });
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Aucun client trouvé avec l'identifiant ` + chantier.ClientId
            })
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });   
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function update(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var chantier = {
        id: req.body.id,
        emplacement: req.body.emplacement,
        cout: req.body.cout,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        walita: req.body.walita,
        yereta: req.body.yereta,
        montant_dispo: req.body.montant_dispo,
        updatedBy: req.user.userId,
    };

    models.Chantier.findByPk(chantier.id).then((chantierFound) => {
        if (!chantierFound) {
            return res.status(404).json({
                status: 'error',
                message: `Aucun chantier trouvé avec l'identifiant ` + chantier.id
            })
        }

        chantierFound.update(chantier).then((chantierUpdated) => {
            if (chantierUpdated) {
                return res.status(200).json(chantierUpdated);
                } else {
                    return res.status(403).json({
                        status: 'error',
                        message: 'Impossible de mettre à jour le chantier '
                    })
                }
            }).catch((err) => {
                console.error(err);
            return res.status(500).json({
                status: 'error',
                message: err.errors
            });
            })
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function destroy(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var id = req.params.id;

    models.Chantier.findByPk(id).then((chantierFound) => {
        if (!chantierFound) {
            return res.status(404).json({
                status: 'error',
                message: `Aucun chantier trouvé avec l'identifiant ` + id
            })
        }

        chantierFound.destroy().then((chantierDestroyed) => {
            if (chantierDestroyed) {
                return res.status(200).json({
                    status: 'success',
                    'message': `Le chantier avec l'identifiant ` + id + ' a été supprimé'
                })
            } else {
                return res.status(403).json({
                    status: 'error',
                    message: `Impossible de supprimer le chantier avec l'identifiant ` + id
                })
            }
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                status: 'error',
                code: 'ER_ROW_IS_REFERENCED_2',
                message: `Une erreur interne est survenue lors de la suppression du chantier`,
                details: err.errors
            });
        });
    }).catch((err) => {
        //find out where errors come from
        //https://stackoverflow.com/a/47002994
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération des informations du chantier',
            details: err.errors
        });
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getAll(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var fields = req.query.fields;
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);
    var order = req.query.order;

    models.Chantier.findAndCountAll({
        order: [(order != null) ? order.split(':'): ['date_debut', 'ASC']],
        attributes: (fields != '*' && fields != null) ? fields.split(';') : null,
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),
        include: [{
            model: models.Client,
            attributes: ['nom', 'prenom', 'telephone']
        }]
    }).then((chantier) => {
        if (chantier) {
            return res.status(200).json(chantier);
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Aucun chantier trouvé`
            });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération des chantiers',
            details: err.errors
        });
    }) 
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getById(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var idChantier = req.params.id;

    models.Chantier.findOne({
        where: {id: idChantier},
        include: [{
            model: models.Client,
            attributes: ['nom', 'prenom', 'telephone']
        }]
    }).then((chantierFound) => {
        if (chantierFound) {
            return res.status(200).json(chantierFound);
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Aucun chantier trouvé avec l'identifiant ` + idChantier
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du chantier ' + idChantier,
            details: err.errors
        });
    });
}

function getClientOfChantier(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var id = req.params.id;

    models.Chantier.findOne({
        where: {id: id},
    }).then((chantierFound) => {
        if (chantierFound) {
            models.Client.findOne({
                where: {id: chantierFound.ClientId}
            }).then((clientFound) => {
                if (clientFound) {                
                    return res.status(200).json(clientFound);
                } else {                    
                    return res.status(404).json({
                        status: 'error',
                        message: `Aucun client trouvé`
                    });
                }    
            }).catch((err) => {
                console.error(err);
                return res.status(500).json(err.errors);
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Aucun chantier trouvé avec l'identifiant ` + id
            });
        }        
    }).catch((err) => {
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du chantier',
            details: err.errors
        });
    });
}

async function getChantierWithOuvriers(req, res) {
    const id = req.params.id;

    let chantiers = await chantierDao.getChantierWithOuvriers(id);

    if (!chantiers) {
        return res.status(404).json({
            message: `Aucun chantier avec l'identifiant ` + id
        });
    }

    if (chantiers.status === 'error') {
        return res.status(500).json(chantiers);
    }

    return res.status(200).json(chantiers);
}

module.exports = {
    save, getAll, getById, getClientOfChantier, update, destroy, getChantierWithOuvriers
};