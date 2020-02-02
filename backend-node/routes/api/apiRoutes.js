var express = require('express');

const clientRouter = require('./client/clientRouter');
const chantierRouter = require('./chantier/chantieRouter');
const ouvrierRouter = require('./ouvrier/ouvrierRouter');
const paiementRouter = require('./paiement/paiementRouter');

/**
 *Available roles 'basic-user', 'medium-user', 'advanced-user', 'admin'
*/

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.use('/client', clientRouter);

    apiRouter.use('/chantier', chantierRouter);

    apiRouter.use('/ouvrier', ouvrierRouter);

    apiRouter.use('/paiement', paiementRouter);
/**
 * Routes to manage the factures
 */

/**
 * Routes to manage the mouvements
 */

    return apiRouter;
})();