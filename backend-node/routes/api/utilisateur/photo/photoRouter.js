let express = require('express');
let router = express.Router();

const accessControl = require('../../../auth/accessControl');
const roles = accessControl.roles;
let photoCtrl = require('./photoCtrl');
let multer = require('../../utils/multer');

router.post('/:id', multer.saveToUploads, (req, res, next) => {
    //console.log(req.path);
    //console.log(req.originalUrl);
    return res.json('get all  photos for chantier ' + req.params.id);
    //return res.json(req.baseUrl);
});

router.post('/', photoCtrl.savePhoto);

module.exports = router;