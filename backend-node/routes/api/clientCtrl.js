var models = require('../../models');
const { validationResult } = require('express-validator');

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
                'message': 'no client found with id ' + id
            })
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors)
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

    models.Client.findAll({
        order: [(order != null) ? order.split(':'): ['nom', 'ASC']],
        attributes: (fields != '*' && fields != null) ? fields.split(';') : null,
        limit: (!isNaN(limit) ? limit : 10),
        offset: (!isNaN(offset) ? offset : null),    
    }).then((client) => {
        if (client) {
            return res.status(200).json(client);
        } else {
            return res.status(404).json({
                'error': 'no client found'
            });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors)
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
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var telephone = req.body.telephone;

    models.Client.findOne({
        where: {telephone: telephone}
    }).then((clientFound) => {
        if (clientFound) {
            return res.status(400).json({
                'error': 'a client with this phone number already exists'
            });
        }

        models.Client.create({
            nom: nom,
            prenom: prenom,
            telephone: telephone,
        }).then((newClient) => {
            if (newClient) {
                return res.status(201).json(newClient);
            } else {
                return res.status(500).json({
                    'err': 'couldn\'t post chantier'
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json(err.errors);
        });
    }).catch((err) => {
        console.error(err);
            return res.status(500).json({
                'error': 'unable to check client validity'
            })
    })

}

module.exports = {
    save, getAll, getById,
}
