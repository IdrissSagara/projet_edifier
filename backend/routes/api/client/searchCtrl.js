const models = require('../../../models');
const clientDao = require('../../../dao/clientDao');

async function search(req, res) {
    let nom = req.query.nom;

    let clients = await clientDao.search(nom);

    if (clients.status === 'error') {
        console.log(clients);
        return res.status(500).json(clients);
    }

    return res.status(200).json(clients);
}

module.exports = {
    search,
};