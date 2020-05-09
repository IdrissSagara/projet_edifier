let express = require('express');
let router = express.Router();

const accessControl = require('../../../auth/accessControl');
const roles = accessControl.roles;
let photoCtrl = require('./photoCtrl');

router.get('/:id', (req, res, next) => {
    return res.json('get all  photos for chantier ' + req.params.id);
});

router.post('/', photoCtrl.savePhoto);

module.exports = router;