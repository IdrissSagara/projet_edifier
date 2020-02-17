var models = require('../models');

async function getChantierById(id, include_client = true) {
    if (!include_client) {
        return models.Chantier.findByPk(id);
    }

    return models.Chantier.findOne({
        where: {id: id},
        include: [{
            model: models.Client,
            attributes: ['nom', 'prenom', 'telephone']
        }]
    });
}

module.exports = {
    getChantierById
};
