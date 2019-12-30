var chantierDao = require('../../dao/chantierDao');
var models = require('../../models');
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

    chantier = {
        ClientId: req.body.clientId,
        emplacement: req.body.emplacement,
        cout: req.body.cout,
        date_debut: req.body.date_debut,
        date_fin: null,
        walita: 0,
        yereta: req.body.cout,
        montant_dispo: req.body.cout,
    }

    models.Client.findOne({
        where: {id: chantier.ClientId}
    }).then((clientFound) => {
        if (clientFound) {            
            models.Chantier.create({
                ClientId: clientFound.id,
                emplacement: chantier.emplacement,
                cout: chantier.cout,
                date_debut: chantier.date_debut,
                date_fin: chantier.date_fin,
                walita: chantier.walita,
                yereta: chantier.yereta,
                montant_dispo: chantier.montant_dispo
            }).then((newChantier) => {
                if (newChantier) {
                    return res.status(201).json(newChantier);
                } else {
                    return res.status(500).json({
                        'error': 'couldn\'t post chantier'
                    });
                }
            }).catch((err) => {
                console.error(err);
                return res.status(500).json(err.errors);
            });
        } else {
            return res.status(404).json({
                'message': 'no client found with id ' + chantier.ClientId
            })
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
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
    var offset = parseInt(req.query.limit);
    var limit = parseInt(req.query.offset);
    var order = req.query.order;
    
    models.Chantier.findAll({
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
                'error': 'no chantier found '
            });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
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
                'error': 'no chantier found with id ' + idChantier
            });
        }
    }).catch((err) => {
        return res.status(500).json(err.errors);
    });
}

function getClient(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var id = req.params.id;

    models.Chantier.findOne({
        where: {id: id},
        include: [{
            model: models.Client,
            attributes: ['nom', 'prenom', 'telephone']
        }]
    }).then((chantierFound) => {
        if (chantierFound) {
            models.Client.findOne({
                where: {id: chantierFound.ClientId}
            }).then((clientFound) => {
                if (clientFound) {                
                    return res.status(200).json(clientFound);
                } else {                    
                    return res.status(404).json({
                        'error': 'no client found'
                    });
                }    
            }).catch((err) => {
                console.error(err);
                return res.status(500).json(err.errors);
            });
        } else {
            return res.status(404).json({
                'error': 'no chantier found with id ' + id
            });
        }        
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

module.exports = {
    save, getAll, getById, getClient
}