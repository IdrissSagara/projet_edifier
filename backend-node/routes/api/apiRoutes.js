var express = require('express');

const clientRouter = require('./client/clientRouter');
const chantierRouter = require('./chantier/chantieRouter');
const ouvrierRouter = require('./ouvrier/ouvrierRouter');

/**
 *Available roles 'basic-user', 'medium-user', 'advanced-user', 'admin'
*/

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.use('/client', clientRouter);

    apiRouter.use('/chantier', chantierRouter);

    apiRouter.use('/ouvrier', ouvrierRouter);
/**
 * Routes to manage the paiements
 */

/**
 * Routes to manage the factures
 */

/**
 * Routes to manage the mouvements
 */

    return apiRouter;
})();