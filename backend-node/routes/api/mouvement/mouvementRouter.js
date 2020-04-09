let express = require('express');
let router = express.Router();

const mouvementCtrl = require('./mouvementCtrl');
const mouvementValidator = require('./mouvementValidator');
const accessControl = require('../../auth/accessControl');
const roles = accessControl.roles;

router.post('/',
    mouvementValidator.validate('save'),
    accessControl.deniedRoles(roles.BASIC),
    mouvementCtrl.save);

//get all Mouvement

router.get('/',
    mouvementValidator.validate('getAllMouvement'),
    accessControl.canAccess([roles.ALL]),
    mouvementCtrl.getAll);

router.get('/:id',
    mouvementValidator.validate('getMouvement'),
    accessControl.canAccess([roles.ALL]),
    mouvementCtrl.getById);

module.exports = router;
