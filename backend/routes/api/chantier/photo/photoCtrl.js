let photoDao = require('../../../../dao/photoDao');
const {validationResult} = require('express-validator');
const photoModel = require('../../../../models').Photo;
const fs = require("fs");
let path = require('path');

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

function deletePhoto(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }
    var id = req.params.id;

    photoModel.findByPk(id).then((photofound) => {
        if (!photofound) {
            return res.status(404).json(photofound);
        }

        let pathToFile = path.join(__dirname, '../../../../public/uploads/chantier/' + photofound.chantier + '/' + photofound.path);

        fs.unlink(pathToFile, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
            photofound.destroy().then((photodeleted) => {
                if (photodeleted) {
                    return res.status(200).json({
                        status: 'error',
                        message: 'photo ' + id + ' deleted'
                    });
                }
            });
        });
    });
}

module.exports = {
    savePhoto, getAllPhotos, saveMultiplePhotos, deletePhoto
};
