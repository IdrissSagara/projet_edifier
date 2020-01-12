var express = require('express');
var loginCtrl = require('./login');
var registerCtrl = require('./register');
// Validators
const loginValidator = require('./validators/loginValidator');
const registerValidator = require('./validators/registerValidator');

const accessControl = require('./accessControl');

exports.router = (function() {
    var authRouter = express.Router();

    /**
     * Route for login
     */
    authRouter.post('/login', loginValidator.validate('login'), loginCtrl.login);

    /**
     * Route for register
     */
    authRouter.post('/register',
        registerValidator.validate('register'),
        accessControl.canAccess(['admin']),
        registerCtrl.register);

    return authRouter;
})();