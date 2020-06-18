let express = require('express');
let router = express.Router();
const accessControl = require('../../auth/accessControl');

const agenceCtrl = require('./agenceCtrl');
const agenceValidator = require('./agenceValidator');
const roles = accessControl.roles;

router.post('/',
    agenceValidator.validate('save'),
    accessControl.deniedRoles(roles.ADVANCED),
    agenceCtrl.getOrCreateAgence);

router.get('/:id',
    agenceValidator.validate('getAgence'),
    accessControl.deniedRoles(roles.ADVANCED),
    agenceCtrl.getAgenceById);
router.put('/',
    agenceValidator.validate('save'),
    accessControl.deniedRoles(roles.ADVANCED),
    agenceCtrl.updateAgence);

module.exports = router;