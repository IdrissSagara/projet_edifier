var express = require('express');
var clientCtrl = require('./clientCtrl');
var chantierCtrl = require('./chantierCtrl');

exports.router = (function() {
    var apiRouter = express.Router();

    //client routes
    apiRouter.route('/client').get(clientCtrl.getAll);
    apiRouter.route('/client/:id').get(clientCtrl.getById);
    apiRouter.route('/client').post(clientCtrl.save);

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