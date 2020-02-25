var express = require('express');
var router = express.Router();
const config = require('../config/jwt_config');
const content = require('../config/content');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: config.app_name, basic: content.basic, pro: content.pro, enterprise: content.enterprise});
});

module.exports = router;
