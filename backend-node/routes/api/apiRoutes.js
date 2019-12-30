var express = require('express');
var clientCtrl = require('./clientCtrl');
var chantierCtrl = require('./chantierCtrl');
const clientValidator = require('./validators/clientValidator');
const chantierValidator = require('./validators/chantierValidator');

exports.router = (function() {
    var apiRouter = express.Router();

    //client routes
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
        clientCtrl.save);

    //chantier routes
    apiRouter.get('/chantier',
        chantierValidator.validate('getAllChantiers'),
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

    //ouvrier routes
    
    //paiement routes

    //facture routes

    //mouvement routes

    return apiRouter;
})();