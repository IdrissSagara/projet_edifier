var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a client resource');
});

router.post('/', function(req, res, next) {
    let client = {
        nom: req.body.nom || '',
        prenom: req.body.prenom || '',
        tel: req.body.tel || ''
    };
    res.send(client);
});

module.exports = router;
