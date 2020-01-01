var express = require('express');
var clientCtrl = require('./clientCtrl');
var chantierCtrl = require('./chantierCtrl');
const clientValidator = require('./validators/clientValidator');
const chantierValidator = require('./validators/chantierValidator');
const login = require('../auth/login');

exports.router = (function() {
    var apiRouter = express.Router();

    /**
     * Routes to manage the Clients
     */
    apiRouter.get('/client', 
        clientValidator.validate('getAllClients'), 
        clientCtrl.getAll);

    apiRouter.get('/client/:id', 
        clientValidator.validate('getClient'), 
        clientCtrl.getById);

    apiRouter.get('/client/:id/chantiers', 
        clientValidator.validate('getChantiers'), 
        clientCtrl.getChantiers);

    apiRouter.post('/client', 
        clientValidator.validate('saveClient'), 
        clientCtrl.update);

    apiRouter.put('/client', 
        clientValidator.validate('saveClient'), 
        clientCtrl.update);

    apiRouter.delete('/client', 
        clientValidator.validate('getClient'), 
        clientCtrl.destroy);

    /**
     * Routes to manage the chantiers
     */
    apiRouter.get('/chantier',
        chantierValidator.validate('getAllChantiers'),
        login.isAuthenticated,
        chantierCtrl.getAll);

    apiRouter.get('/chantier/:id',
        chantierValidator.validate('getChantier'),
        chantierCtrl.getById);
    
    apiRouter.get('/chantier/:id/client', 
        chantierValidator.validate('getChantier'),
        chantierCtrl.getClient);

    apiRouter.post('/chantier', 
        chantierValidator.validate('saveChantier'), 
        chantierCtrl.save);

    apiRouter.put('/chantier',
        chantierValidator.validate('saveChantier'),
        chantierCtrl.update);

    apiRouter.delete('/chantier',
        chantierValidator.validate('getChantier'),
        chantierCtrl.destroy);

    //ouvrier routes
    
    //paiement routes

    //facture routes

    //mouvement routes

    return apiRouter;
})();