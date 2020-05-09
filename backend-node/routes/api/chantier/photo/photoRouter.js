let express = require('express');
let router = express.Router();

const accessControl = require('../../../auth/accessControl');
const roles = accessControl.roles;
let photoCtrl = require('./photoCtrl');
let multer = require('../../utils/multer');

router.post('/:id', multer.saveToUploads, (req, res, next) => {
    console.log(req.file);

    return res.json('photos of chantier ' + req.params.id + ' saved at ' + req.file.path);
});

router.post('/', photoCtrl.savePhoto);

module.exports = router;