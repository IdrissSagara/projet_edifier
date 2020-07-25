let express = require('express');
let router = express.Router();
let photoRouter = require('./photo/photoRouter');

let utilisateurValidator = require('./utilisateurValidator');
const accessControl = require('../../auth/accessControl');
let utilisateurCtrl = require('./utilisateurCtrl');
const roles = accessControl.roles;

//get all users

router.get('/',
    utilisateurValidator.validate('getAllUsers'),
    accessControl.canAccess([roles.ALL]),
    utilisateurCtrl.getAll);

router.get('/whoami',
    accessControl.canAccess([roles.ALL]),
    utilisateurCtrl.whoAmI);

router.get('/:id',
    utilisateurValidator.validate('getUser'),
    accessControl.canAccess([roles.ALL]),
    utilisateurCtrl.getUserById);

router.put('/',
    utilisateurValidator.validate('update'),
    accessControl.canAccess([roles.ALL]),
    utilisateurCtrl.updateUser);

router.delete('/:id',
    utilisateurValidator.validate('getUser'),
    accessControl.canAccess(['admin', 'advanced-user']),
    utilisateurCtrl.destroy);

router.use('/photo', photoRouter);

module.exports = router;
