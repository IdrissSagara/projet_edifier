let express = require('express');
let router = express.Router();

const photoValidator = require('./photoValidator');
const validate = require('../../validationCtrl').validate;
const accessControl = require('../../../auth/accessControl');
const roles = accessControl.roles;
let photoCtrl = require('./photoCtrl');
let multer = require('../../utils/multer');

router.post('/:id',
    photoValidator.validate('get'), validate,
    multer.saveToUploads,
    accessControl.canAccess(roles.ALL),
    photoCtrl.savePhoto);

router.get('/:id',
    photoValidator.validate('get'), validate,
    accessControl.canAccess(roles.ALL),
    photoCtrl.getAllPhotos);

module.exports = router;