var express = require('express');

const clientRouter = require('./client/clientRouter');
const chantierRouter = require('./chantier/chantieRouter');
const ouvrierRouter = require('./ouvrier/ouvrierRouter');
const paiementRouter = require('./paiement/paiementRouter');
const mouvementRouter = require('./mouvement/mouvementRouter');
const utilisateurRouter = require('./utilisateur/utilisateurRouter');
const agenceRouter = require('./agence/agenceRouter');
const reportingRouter = require('./reporting/reportingRouter');

/**
 *Available roles 'basic-user', 'medium-user', 'advanced-user', 'admin'
 */

exports.router = (function () {
    var apiRouter = express.Router();

    apiRouter.use('/client', clientRouter);

    apiRouter.use('/chantier', chantierRouter);

    apiRouter.use('/ouvrier', ouvrierRouter);

    apiRouter.use('/paiement', paiementRouter);

    apiRouter.use('/mouvement', mouvementRouter);

    apiRouter.use('/utilisateur', utilisateurRouter);

    apiRouter.use('/agence', agenceRouter);

    apiRouter.use('/reporting', reportingRouter);

    return apiRouter;
})();
