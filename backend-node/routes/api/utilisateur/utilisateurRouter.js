let express = require('express');
let router = express.Router();

let utilisateurValidator = require('./utilisateurValidator');
const accessControl = require('../../auth/accessControl');
let utilisateurCtrl = require('./utilisateurCtrl');
const roles = accessControl.roles;

//get all users

router.get('/',
    utilisateurValidator.validate('getAllUsers'),
    accessControl.canAccess([roles.ALL]),
    utilisateurCtrl.getAll);
router.get('/:id',
    utilisateurValidator.validate('getUser'),
    accessControl.canAccess([roles.ALL]),
    utilisateurCtrl.getUserById);
router.put('/',
    utilisateurValidator.validate('update'),
    accessControl.canAccess([roles.ALL]),
    utilisateurCtrl.updateUser);

module.exports = router;