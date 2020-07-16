let models = require('../models');

async function savePhoto(photo, transaction) {
    return models.Photo.create(photo, {
        transaction: transaction
    }).catch((err) => {
        return {
            status: 'error',
            message: `Une erreur est survenue lors de l'enregistrement de la photo`,
            details: err.errors
        };
    });
}

async function saveMultiplePhotos(photos, transaction) {
    return models.Photo.bulkCreate(photos, {
        transaction: transaction, returning: true
    }).catch((err) => {
        return {
            status: 'error',
            message: `Une erreur est survenue lors de l'enregistrement de la photo`,
            details: err.errors
        };
    });
}

async function getAllPhotos(chantierId) {
    return models.Photo.findAndCountAll({
        where: {
            chantier: chantierId,
            type: 'chantier'
        }
    }).catch((err) => {
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la recupération des photos du chantier ` + chantierId,
            details: err.errors
        };
    });
}

module.exports = {
    savePhoto, getAllPhotos, saveMultiplePhotos
};
