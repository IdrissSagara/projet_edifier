let express = require('express');
let router = express.Router();

let paiementValidator = require('./paiementValidator');
const accessControl = require('../../auth/accessControl');
let paiementCtrl = require('./paiementCtrl');
const roles = accessControl.roles;

// /chantier/:id_chantier/paiement/
router.get('/chantier/:id',
    paiementValidator.validate('getById',),
    accessControl.canAccess([roles.ALL]),
    paiementCtrl.getAll
);

router.post('/chantier/:id',
    paiementValidator.validate('save'),
    accessControl.canAccess([roles.ALL]),
    paiementCtrl.save
);

// /chantier/:id_chantier/paiement/
router.get('/:id_paiement/chantier/:id_chantier/',
    paiementValidator.validate('getOnePaieOfChan',),
    accessControl.canAccess([roles.ALL]),
    paiementCtrl.getById
);

module.exports = router;