let express = require('express');
let router = express.Router();

let clientValidator = require('./clientValidator');
const accessControl = require('../../auth/accessControl');
let clientCtrl = require('./clientCtrl');
const clientSearchCtrl = require('./searchCtrl');
const validate = require('../validationCtrl').validate;
const roles = accessControl.roles;

router.get('/',
    clientValidator.validate('getAllClients'),
    accessControl.canAccess([roles.ALL]),
    clientCtrl.getAll);

router.get('/search',
    clientValidator.validate('search'), validate,
    accessControl.canAccess([roles.ALL]),
    clientSearchCtrl.search);

router.get('/:id',
    clientValidator.validate('getClient'),
    accessControl.canAccess(['advanced-user', 'admin']),
    clientCtrl.getById);

//get all the chantiers of a client
router.get('/:id/chantiers',
    clientValidator.validate('getChantiers'),
    accessControl.canAccess(['advanced-user', 'admin']),
    clientCtrl.getChantiersOfClient);

//save a client
router.post('/',
    clientValidator.validate('saveClient'),
    accessControl.canAccess([roles.ALL]),
    clientCtrl.save);

//edit a client
router.put('/',
    clientValidator.validate('saveClient'),
    accessControl.canAccess(['medium-user', 'advanced-user', 'admin']),
    clientCtrl.update);

//delete a client
router.delete('/:id',
    clientValidator.validate('getClient'),
    accessControl.deniedRoles([roles.BASIC]),
    clientCtrl.destroy);

module.exports = router;