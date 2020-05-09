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

module.exports = {
    savePhoto
};