let photoDao = require('../../../../dao/photoDao');

async function savePhoto(req, res, next) {
    const photo = {
        chantier: req.params.id,
        type: req.params.type,
        user: null,
        path: file.filename, //will be accessible on {serverUrl}/uploads/chantier/{idChantier}/{filename}
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

async function saveMultiplePhotos(req, res, next) {
    let imageFiles = req.files;
    let imagesToSave = [];
    imageFiles.map(file => {
        const photo = {
            chantier: req.params.id,
            type: req.params.type,
            user: null,
            path: file.filename, //will be accessible on {serverUrl}/uploads/chantier/{idChantier}/{filename}
            createdBy: req.user.userId,
            updatedBy: req.user.userId
        };

        imagesToSave = [...imagesToSave, photo];
    });

    let savedImages = await photoDao.saveMultiplePhotos(imagesToSave);

    if (!savedImages) {
        return res.status(401).json({
            status: 'error',
            message: `Impossible d'enregistrer les photos du chantier`
        })
    }

    if (savedImages.status === 'error') {
        return res.status(500).json(savedImages);
    }

    return res.status(201).json(savedImages);
}

async function getPhoto(req, res) {
    return res.status(500).json({
        status: 'error',
        message: 'not implemented yet'
    })
}

async function getAllPhotos(req, res) {
    let chantier = req.params.id;

    // check if the chantier exists first

    let photosFound = await photoDao.getAllPhotos(chantier);

    if (!photosFound) {
        return res.status(404).json({
            message: `Aucune photo trouvée pour le chantier ` + chantier
        })
    }

    if (photosFound.status === 'error') {
        return res.status(500).json(photosFound);
    }

    return res.status(200).json(photosFound);
}

module.exports = {
    savePhoto, getPhoto, getAllPhotos, saveMultiplePhotos
};
