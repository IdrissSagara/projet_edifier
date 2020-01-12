var express = require('express');
//controller
var clientCtrl = require('./clientCtrl');
var chantierCtrl = require('./chantierCtrl');
var ouvrierCtrl = require('./ouvrierCtrl');
//validators
var clientValidator = require('./validators/clientValidator');
var chantierValidator = require('./validators/chantierValidator');
var ouvrierValidator = require('./validators/ouvrierValidator');

const accessControl = require('../auth/accessControl');

const roles = {
    ADMIN: 'admin',
    ADVANCED: 'advanced-user',
    ALL: 'all',
    BASIC: 'basic-user',
    MEDIUM: 'medium-user',
}

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
        accessControl.canAccess([roles.ALL]),
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
        accessControl.canAccess([roles.ALL]),
        clientCtrl.save);

    //edit a client
    apiRouter.put('/client', 
        clientValidator.validate('saveClient'), 
        accessControl.canAccess(['medium-user', 'advanced-user', 'admin']),
        clientCtrl.update);

    //delete a client
    apiRouter.delete('/client', 
        clientValidator.validate('getClient'), 
        accessControl.deniedRoles([roles.BASIC]),
        clientCtrl.destroy);

/**
 * Routes to manage the chantiers
 */
    //get all the chantiers
    apiRouter.get('/chantier',
        chantierValidator.validate('getAllChantiers'),
        accessControl.canAccess([roles.ALL]),
        chantierCtrl.getAll);

    //get a chantier by its id
    apiRouter.get('/chantier/:id',
        chantierValidator.validate('getChantier'),
        accessControl.canAccess([roles.ALL]),
        chantierCtrl.getById);
    
    //get the client of the chantier
    apiRouter.get('/chantier/:id/client', 
        chantierValidator.validate('getChantier'),
        accessControl.canAccess([roles.ALL]),
        chantierCtrl.getClient);

    //save a chantier
    apiRouter.post('/chantier', 
        chantierValidator.validate('saveChantier'), 
        accessControl.canAccess([roles.ALL]),
        chantierCtrl.save);
    
    //edit a chantier
    apiRouter.put('/chantier',
        chantierValidator.validate('saveChantier'),
        accessControl.canAccess([roles.ALL]),
        chantierCtrl.update);

    //delete a chantier
    apiRouter.delete('/chantier',
        chantierValidator.validate('getChantier'),
        accessControl.deniedRoles([roles.BASIC]),
        chantierCtrl.destroy);

/**
 * Routes to manage the ouvriers
 */
    //save a ouvrier
    apiRouter.post('/ouvrier',
        ouvrierValidator.validate('save'),
        accessControl.canAccess([roles.ALL]),
        ouvrierCtrl.save);

    //get all the ouvriers
    apiRouter.get('/ouvrier',
        accessControl.canAccess([roles.ALL]),
        ouvrierCtrl.getAll)

    //get a ouvrier by id
    apiRouter.get('/ouvrier/:id',
        ouvrierValidator.validate('getById'),
        accessControl.canAccess([roles.ALL]),
        ouvrierCtrl.getById);

    //edit a ouvrier
    apiRouter.put('/ouvrier',
        ouvrierValidator.validate('getById'),
        accessControl.canAccess([roles.ALL]),
        ouvrierCtrl.update);

    apiRouter.delete('/ouvrier',
        ouvrierValidator.validate('getById'),
        accessControl.deniedRoles([roles.BASIC]),
        ouvrierCtrl.destroy)
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