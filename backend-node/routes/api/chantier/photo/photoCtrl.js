let photoDao = require('../../../../dao/photoDao');

async function savePhoto(req, res, next) {
    const photo = {
        chantier: req.params.id,
        type: req.params.type,
        user: null,
        path: req.file.path,
        createdBy: req.user.userId,
        updatedBy: req.user.userId
    };

    let photoSaved = await photoDao.savePhoto(photo);

    if (!photoSaved) {
        return res.status(401).json({
            status: 'error',
            message: `Impossible d'enregistrer la photo du chantier`
        })
    }

    if (photoSaved.status === 'error') {
        return res.status(500).json(photoSaved);
    }

    return res.status(201).json(photoSaved);
}

async function getPhoto(req, res) {
    return res.status(500).json({
        status: 'error',
        message: 'not implemented yet'
    })
}

module.exports = {
    savePhoto, getPhoto
};