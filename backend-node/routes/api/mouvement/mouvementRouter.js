let express = require('express');
let router = express.Router();

const mouvementCtrl = require('./mouvementCtrl');
const mvtCtrl = require('./mouvementValidator');
const accessControl = require('../../auth/accessControl');
const roles = accessControl.roles;

router.post('/',
    mvtCtrl.validate('save'),
    accessControl.deniedRoles(roles.BASIC),
    mouvementCtrl.save);

module.exports = router;
