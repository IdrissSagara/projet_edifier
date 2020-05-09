let express = require('express');
let router = express.Router();
let photoRouter = require('./photo/photoRouter');

let chantierValidator = require('./chantierValidator');
const validate = require('../validationCtrl').validate;
const accessControl = require('../../auth/accessControl');
let chantierCtrl = require('./chantierCtrl');
const roles = accessControl.roles;

//get all the chantiers
router.get('/',
    chantierValidator.validate('getAllChantiers'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getAll);

//get a chantier by its id
router.get('/:id',
    chantierValidator.validate('getChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getById);

//get the client of the chantier
router.get('/:id/client',
    chantierValidator.validate('getChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getClientOfChantier);

router.get('/:id/ouvriers',
    chantierValidator.validate('getChantier'), validate,
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getChantierWithOuvriers);

//save a chantier
router.post('/',
    chantierValidator.validate('saveChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.save);

//edit a chantier
router.put('/',
    chantierValidator.validate('saveChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.update);

//delete a chantier
router.delete('/:id',
    chantierValidator.validate('getChantier'),
    accessControl.deniedRoles([roles.BASIC]),
    chantierCtrl.destroy);

router.use('/photo', photoRouter);

module.exports = router;