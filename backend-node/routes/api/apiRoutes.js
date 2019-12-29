var express = require('express');
var clientCtrl = require('./clientCtrl');
var chantierCtrl = require('./chantierCtrl');
var clientValidator = require('./validators/clientValidator');

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
    apiRouter.route('/chantier').get(chantierCtrl.getAll);
    apiRouter.route('/chantier/:id').get(chantierCtrl.getById);
    apiRouter.route('/chantier').post(chantierCtrl.save);

    //ouvrier routes
    
    //paiement routes

    //facture routes

    //mouvement routes

    return apiRouter;
})();