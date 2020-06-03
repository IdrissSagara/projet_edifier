let express = require('express');
let router = express.Router();

let paiementValidator = require('./paiementValidator');
const accessControl = require('../../auth/accessControl');
let paiementCtrl = require('./paiementCtrl');
const factureCtrl = require('../pdf_generation/generatePDF');
const roles = accessControl.roles;

router.get('/all',
    paiementValidator.validate('getAllPaiements',),
    accessControl.canAccess([roles.ALL]),
    paiementCtrl.getVeryAll
);

// /chantier/:id_chantier/paiement/
router.get('/chantier/:id',
    paiementValidator.validate('getById',),
    accessControl.canAccess([roles.ALL]),
    paiementCtrl.getAll
);

router.post('/chantier/:id',
    paiementValidator.validate('save'),
    accessControl.canAccess([roles.ALL]),
    paiementCtrl.save,
    factureCtrl.sendRecuPDF
);

// /chantier/:id_chantier/paiement/
//gets a specific paiement for a given chantier
router.get('/:id_paiement/chantier/:id_chantier/',
    paiementValidator.validate('getOnePaieOfChan',),
    accessControl.canAccess([roles.ALL]),
    paiementCtrl.getById
);

router.get('/:id/facture/',
    paiementValidator.validate('getById',),
    accessControl.canAccess([roles.ALL]),
    factureCtrl.sendRecuPDF
);

/**
 * /api/paiement/:id_paiement
 * Deletes a paiement
 */
router.delete('/:id',
    paiementValidator.validate('getById',),
    accessControl.deniedRoles([roles.BASIC]),
    paiementCtrl.destroy
);

module.exports = router;