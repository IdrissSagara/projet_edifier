let express = require('express');
let router = express.Router();
const accessControl = require('../../auth/accessControl');

const agenceCtrl = require('./agenceCtrl');
const agenceValidator = require('./agenceValidator');
const roles = accessControl.roles;
let logoMulter = require('../utils/logo-multer');

router.post('/',
    //agenceValidator.validate('save'),
    logoMulter.saveLogo,
    accessControl.canAccess(roles.ADMIN),
    agenceCtrl.insertOrUpdate);

router.get('/',
    agenceValidator.validate('getAgence'),
    accessControl.canAccess(roles.ADMIN),
    agenceCtrl.getAgence);

module.exports = router;