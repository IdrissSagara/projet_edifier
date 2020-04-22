var models = require('../../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function search(req, res) {
    let nom = req.query.nom;

    models.Client.findAll({
        where: {
            [Op.or]: [
                {
                    nom: {[Op.like]: '%' + nom + '%'}
                },
                {
                    prenom: {[Op.like]: '%' + nom + '%'}
                }
            ]
        }
    }).then((clients) => {
        return res.status(200).json(clients);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}

module.exports = {
    search,
};