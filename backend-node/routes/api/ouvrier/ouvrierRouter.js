let express = require('express');
let router = express.Router();

let ouvrierValidator = require('./ouvrierValidator');
const validate = require('../validationCtrl').validate;
const accessControl = require('../../auth/accessControl');
let ouvrierCtrl = require('./ouvrierCtrl');
const roles = accessControl.roles;

//save a ouvrier
router.post('/',
    ouvrierValidator.validate('save'),
    accessControl.canAccess([roles.ALL]),
    ouvrierCtrl.save);

//get all the ouvriers
router.get('/',
    ouvrierValidator.validate('getAllOuvriers'),
    accessControl.canAccess([roles.ALL]),
    ouvrierCtrl.getAll);

//get a ouvrier by id
router.get('/:id',
    ouvrierValidator.validate('getById'),
    accessControl.canAccess([roles.ALL]),
    ouvrierCtrl.getById);

router.post('/:id/affecter',
    ouvrierValidator.validate('getById'), validate,
    accessControl.canAccess([roles.ALL]),
    ouvrierCtrl.affect);

router.get('/:id/chantiers',
    ouvrierValidator.validate('getById'), validate,
    accessControl.canAccess([roles.ALL]),
    ouvrierCtrl.getOuvrierWithChantiers);

//edit a ouvrier
router.put('/',
    ouvrierValidator.validate('getById'),
    accessControl.canAccess([roles.ALL]),
    ouvrierCtrl.update);

router.delete('/',
    ouvrierValidator.validate('getById'),
    accessControl.deniedRoles([roles.BASIC]),
    ouvrierCtrl.destroy);

module.exports = router;