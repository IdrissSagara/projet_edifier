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

router.delete('/:id',
    mouvementValidator.validate('getMouvement'),
    accessControl.deniedRoles([roles.BASIC]),
    mouvementCtrl.destroy);

module.exports = router;
