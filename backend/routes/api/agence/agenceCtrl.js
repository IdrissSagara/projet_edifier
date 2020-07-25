var models = require('../../../models');
const {validationResult} = require('express-validator');
const agenceDao = require('../../../dao/agenceDao');

async function insertOrUpdate(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    let agence = {
        id: req.body.id,
        rccm: req.body.rccm,
        fiscal: req.body.fiscal,
        libelle: req.body.libelle,
        telephone: req.body.telephone,
        fax: req.body.fax,
        mail: req.body.mail,
        adresse: req.body.adresse,
        logo: req.file.filename, //will be accessible on {serverUrl}/uploads/logo/{filename}
        createdBy: req.user.userId,
        updatedBy: req.user.userId,
    };

    models.Agence.upsert(agence).then((isNew) => {
        return res.status(201).json(isNew);
    }).catch((err) => {
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur interne est survenue lors de la UPSERT de l\'agence ',
            details: err.errors
        });
    });
}

async function getAgence(req, res) {
    models.Agence.findAll().then((agence) => {
        if (!agence)
            return res.status(404).json({
                message: 'aucune information trouvé sur l\'agence'
            });
        return res.status(200).json(agence);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


module.exports = {
    insertOrUpdate, getAgence
};
