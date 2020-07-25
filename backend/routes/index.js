var express = require('express');
var router = express.Router();

const contactValidator = require('../routes/contactController');
const {validationResult} = require('express-validator');

const config = require('../config/jwt_config');
const content = require('../config/content');

let contentObj = {title: config.app_name, basic: content.basic, pro: content.pro, enterprise: content.enterprise};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', contentObj);
});

router.post('/contact', contactValidator.validate('send'), function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.locals.errors = errors.array();
    res.locals.post = req.body;
    return res.render('index', contentObj);
  }

  const nom = req.body.name;
  const email = req.body.email;
  const tel = req.body.phone;
  const subject = req.body.subject;
  const msg = req.body.message;

  console.log({
    nom, email, tel, subject, msg
  });
  res.render('index', {title: config.app_name, basic: content.basic, pro: content.pro, enterprise: content.enterprise});
});

module.exports = router;
