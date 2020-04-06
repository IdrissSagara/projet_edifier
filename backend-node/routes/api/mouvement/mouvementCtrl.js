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
        idChantier: req.body.source
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

    mvtDao.save(mouvement).catch((err) => {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: err.errors
        });
    });
}

module.exports = {
    save
};