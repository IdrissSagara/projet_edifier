let express = require('express');
let router = express.Router();
const accessControl = require('../../auth/accessControl');
const roles = accessControl.roles;
const reportingCtrl = require('./reportingCtrl');

router.get('/', accessControl.canAccess(roles.ADMIN), reportingCtrl.getReporting);

module.exports = router;
