var models = require('../../../models');
const {validationResult} = require('express-validator');
const agenceDao = require('../../../dao/agenceDao');


async function getOrCreateAgence(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    let agence = {
        rccm: req.body.rccm,
        fiscal: req.body.fiscal,
        libelle: req.body.libelle,
        telephone: req.body.telephone,
        fax: req.body.fax,
        mail: req.body.mail,
        adresse: req.body.adresse,
        logo: req.body.logo,
        createdBy: req.user.userId,
        updatedBy: req.user.userId,
    };
    models.Agence.findOne({
        where: {telephone: agence.telephone}
    }).then((agenceFound) => {
        if (!agenceFound) {
            models.Agence.create(agence).then((newAgence) => {
                if (!newAgence) {
                    return res.status(500).json({
                        message: 'Une erreur est survenue lors de la création de l\'agence'
                    });
                }
                return res.status(201).json(newAgence);
            }).catch((err) => {
                return res.status(500).json({
                    status: 'error',
                    message: 'Une erreur interne est survenue lors de la recuperation des information de l\'agence ',
                    details: err.errors
                });
            })
        } else {
            return res.status(200).json(agenceFound);
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json(err.errors);
    });
}

async function updateAgence(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    var agence = {
        id: req.body.id,
        rccm: req.body.rccm,
        fiscal: req.body.fiscal,
        libelle: req.body.libelle,
        telephone: req.body.telephone,
        fax: req.body.fax,
        mail: req.body.mail,
        adresse: req.body.adresse,
        logo: req.body.logo,
    }

    let agenceUpdate = await agenceDao.updateAgence(agence);

    if (agenceUpdate.status === 'error') {
        return res.status(500).json(agence);
    }

    return res.status(200).json(agence);

}

async function getAgenceById(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    var id = req.params.id;

    let agence = await agenceDao.getAgenceById(id);

    if (!agence) {
        return res.status(404).json({
            status: 'error',
            message: `Aucune agence trouvé avec l'identifiant ` + id
        });
    }

    if (agence.status === 'error') {
        return res.status(500).json(agence);
    }
    return res.status(200).json(agence);
}

module.exports = {
    getAgenceById, getOrCreateAgence, updateAgence,
}