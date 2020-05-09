let express = require('express');
let router = express.Router();

const accessControl = require('../../../auth/accessControl');
const roles = accessControl.roles;
let photoCtrl = require('./photoCtrl');
let multer = require('../../utils/multer');

router.post('/:id', multer.saveToUploads,
    accessControl.canAccess(roles.ALL),
    photoCtrl.savePhoto);

router.get('/:id', accessControl.canAccess(roles.ALL),
    photoCtrl.getPhoto);

module.exports = router;