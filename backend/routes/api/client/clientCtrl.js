var models = require('../../../models');
const {validationResult} = require('express-validator');
const clientDao = require('../../../dao/clientDao');
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

    var id = req.params.id;

    models.Client.findOne({
        where: {id: id}
    }).then((clientFound) => {
        if (clientFound) {
            return res.status(200).json(clientFound);
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Aucun client trouvé avec l'identifiant ` + id
            })
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du client',
            details: err.errors
        })
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
        res.status(422).json({errors: errors.array()});
        return;
    }

    var fields = req.query.fields;
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);
    var order = req.query.order;

    models.Client.findAndCountAll({
        order: [(order != null) ? order.split(':') : ['nom', 'ASC']],
        attributes: (fields != '*' && fields != null) ? fields.split(';') : null,
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),
    }).then((client) => {
        if (client) {
            return res.status(200).json(client);
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Aucun client trouvé`
            });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération des clients',
            details: err.errors
        })
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function save(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    const client = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        createdBy: req.user.userId,
        updatedBy: req.user.userId,
    };

    models.Client.findOne({
        where: {telephone: client.telephone}
    }).then((clientFound) => {
        if (clientFound) {
            return res.status(400).json({
                status: 'error',
                message: `Un client possède déjà ce numéro de téléphone`
            });
        }

        models.Client.create(client).then((newClient) => {
            if (newClient) {
                return res.status(201).json(newClient);
            } else {
                return res.status(500).json({
                    status: 'error',
                    message: `Impossible d'enregistrer le client`
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({
                status: 'error',
                message: `Une erreur interne est survenue lors de l'enregistement du client`,
                details: err.errors
            });
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du client',
            details: err.errors
        });
    })

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

    const client = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        updatedBy: req.user.userId,
    };

    models.Client.findByPk(client.id).then((clientFound) => {
        if (!clientFound) {
            return res.status(404).json({
                status: 'error',
                message: `Aucun client trouvé avec l'identifiant ` + client.id
            })
        }

        clientFound.update(client).then((clientUpdated) => {
                if (clientUpdated) {
                    return res.status(200).json(clientUpdated);
                } else {
                    return res.status(403).json({
                        status: 'error',
                        message: `Impossible de mettre à jour le client`
                    })
                }
            }).catch((err) => {
                console.error(err);
            return res.status(500).json({
                    status: 'error',
                    message: 'Une erreur interne est survenue lors de la mise à jour du client',
                    details: err.errors
                }
            );
            })
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du client',
            details: err.errors
        });
    });
}

function destroy(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var id = req.params.id;

    models.Client.findByPk(id).then((clientFound) => {
        if (!clientFound) {
            return res.status(404).json({
                status: 'error',
                message: `Aucun client trouvé avec l'identifiant ` + id
            })
        }

        clientFound.destroy().then((clientDestroyed) => {
            if (clientDestroyed) {
                return res.status(200).json({
                    status: 'error',
                    message: 'client ' + id + ' deleted'
                })
            } else {
                return res.status(403).json({
                    status: 'error',
                    message: `Impossible de supprimer le client avec l'identifiant ` + id
                })
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({
                status: 'error',
                message: 'Une erreur interne est survenue lors de la suppression du client',
                details: err.errors
            });
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du client',
            details: err.errors
        });
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getChantiers(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var id = req.params.id;

    models.Client.findOne({
        where: {id: id}
    }).then((clientFound) => {
        if (clientFound) {
            models.Chantier.findByPk(id).then((chantiersFound) => {
                if (chantiersFound) {
                    return res.status(200).json(chantiersFound);
                } else {
                    return res.status(404).json({
                        status: 'error',
                        message: `Aucun chantier trouvé`
                    })
                }
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({
                    status: 'error',
                    message: 'Une erreur interne est survenue lors de la récupération du client',
                    details: err.errors
                });
            })
        } else {
            return res.status(404).json({
                status: 'error',
                message: `Aucun client trouvé avec l'identifiant ` + id
            })
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la récupération du chantier',
            details: err.errors
        });
    });
}

async function getChantiersOfClient(req, res) {
    const id = req.params.id;
    const client = await clientDao.getChantierofClient(id);
    if (!client) {
        return res.status(404).json({
            message: 'no client found with id ' + id
        });
    }

    if (client.status === 'error') {
        return res.status(500).json(client);
    }

    return res.status(200).json(client);
}

module.exports = {
    save, getAll, getById, getChantiers, update, destroy, getChantiersOfClient
};
