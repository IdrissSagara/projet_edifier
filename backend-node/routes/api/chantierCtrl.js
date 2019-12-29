var chantierDao = require('../../dao/chantierDao');
var models = require('../../models');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function save(req, res) {
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

    models.Chantier.create({
        ClientId: chantier.clientId,
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
                'err': 'couldn\'t post chantier'
            });
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
    try {        
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
    } catch (err) {
        return res.status(500).json({
            'error': 'can\'t continue, probably int parsing error'
        })
    } 
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getById(req, res) {
    var idChantier = req.params.id;

    if (!idChantier)
        return res.status(401).json({
            'error': 'no chantier id parameter found'
        });

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

module.exports = {
    save, getAll, getById
}