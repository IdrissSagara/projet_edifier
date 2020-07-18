const userDao = require('../../../dao/userDAO');
const clientDao = require('../../../dao/clientDao');
const ouvrierDao = require('../../../dao/ouvrierDao');
const chantierOuvrierDao = require('../../../dao/chantierOuvrierDao');
const chantierReportingDao = require('../../../dao/chantierReportingDao');
const mouvementDao = require('../../../dao/mouvementDao');

const accessControl = require('../../auth/accessControl');

async function getReporting(req, res, next) {
    let chantierCount = await chantierReportingDao.getCount();
    if (chantierCount.status === 'error') {
        return res.status(500).json(chantierCount);
    }

    let chantiersNotCompleted = await chantierReportingDao.getNotCompleted();
    if (chantiersNotCompleted.status === 'error') {
        return res.status(500).json(chantiersNotCompleted);
    }

    let incompletePaie = await chantierReportingDao.getNotfullyPaid();
    if (incompletePaie.status === 'error') {
        return res.status(500).json(incompletePaie);
    }

    let noPaiment = await chantierReportingDao.getNoPaiementAtAll();
    if (noPaiment.status === 'error') {
        return res.status(500).json(noPaiment);
    }

    let clientsCount = await clientDao.getCount();
    if (clientsCount.status === 'error') {
        return res.status(500).json(clientsCount);
    }

    let ouvriersCount = await ouvrierDao.getCount();
    if (ouvriersCount.status === 'error') {
        return res.status(500).json(ouvriersCount);
    }

    let ouvriersInChantierCount = await chantierOuvrierDao.getOuvrierCount();
    if (ouvriersInChantierCount.status === 'error') {
        return res.status(500).json(ouvriersInChantierCount);
    }

    let lastMouvement = await mouvementDao.getLast();
    if (lastMouvement.status === 'error') {
        return res.status(500).json(lastMouvement);
    }

    let userCount = await userDao.getCount();
    if (userCount.status === 'error') {
        return res.status(500).json(userCount);
    }

    let report = {
        chantiers: chantierCount,
        clients: clientsCount,
        ouvriers: ouvriersCount,
        affectedOuvriers: ouvriersInChantierCount,
        users: userCount,
        lastMouvement,
        chantiersNotCompleted,
        incompletePaiements: incompletePaie,
        noPaiment
    }

    return res.json(report);
}

module.exports = {
    getReporting,
}
