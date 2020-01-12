var express = require('express');
var clientCtrl = require('./clientCtrl');
var chantierCtrl = require('./chantierCtrl');
const clientValidator = require('./validators/clientValidator');
const chantierValidator = require('./validators/chantierValidator');
const accessControl = require('../auth/accessControl');

/**
 *Available roles 'basic-user', 'medium-user', 'advanced-user', 'admin'
*/

exports.router = (function() {
    var apiRouter = express.Router();

/**
 * Routes to manage the Clients
 */
    //get all the clients
    apiRouter.get('/client', 
        clientValidator.validate('getAllClients'),
        accessControl.canAccess(['all']),
        clientCtrl.getAll);

    //get a client by its id
    apiRouter.get('/client/:id', 
        clientValidator.validate('getClient'),
        accessControl.canAccess(['advanced-user', 'admin']),
        clientCtrl.getById);

    //get all the chantiers of a client
    apiRouter.get('/client/:id/chantiers', 
        clientValidator.validate('getChantiers'),
        accessControl.canAccess(['advanced-user', 'admin']),
        clientCtrl.getChantiers);

    //save a client
    apiRouter.post('/client', 
        clientValidator.validate('saveClient'),
        accessControl.canAccess(['all']),
        clientCtrl.save);

    //edit a client
    apiRouter.put('/client', 
        clientValidator.validate('saveClient'), 
        accessControl.canAccess(['medium-user', 'advanced-user', 'admin']),
        clientCtrl.update);

    //delete a client
    apiRouter.delete('/client', 
        clientValidator.validate('getClient'), 
        clientCtrl.destroy);

/**
 * Routes to manage the chantiers
 */
    //get all the chantiers
    apiRouter.get('/chantier',
        chantierValidator.validate('getAllChantiers'),
        accessControl.canAccess(['all']),
        chantierCtrl.getAll);

    //get a chantier by its id
    apiRouter.get('/chantier/:id',
        chantierValidator.validate('getChantier'),
        accessControl.canAccess(['all']),
        chantierCtrl.getById);
    
    //get the client of the chantier
    apiRouter.get('/chantier/:id/client', 
        chantierValidator.validate('getChantier'),
        accessControl.canAccess(['all']),
        chantierCtrl.getClient);

    //save a chantier
    apiRouter.post('/chantier', 
        chantierValidator.validate('saveChantier'), 
        accessControl.canAccess(['all']),
        chantierCtrl.save);
    
    //edit a chantier
    apiRouter.put('/chantier',
        chantierValidator.validate('saveChantier'),
        chantierCtrl.update);

    //delete a chantier
    apiRouter.delete('/chantier',
        chantierValidator.validate('getChantier'),
        chantierCtrl.destroy);

    //ouvrier routes
    
    //paiement routes

    //facture routes

    //mouvement routes

    return apiRouter;
})();