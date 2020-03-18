var express = require('express');
var loginCtrl = require('./loginCtrl');
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
    authRouter.post('/login', loginValidator.validate('login'), loginCtrl.loginCtrl);

    /**
     * Route for register
     */
    authRouter.post('/register',
        registerValidator.validate('register'),
        accessControl.canAccess(['admin']),
        registerCtrl.register);

    authRouter.post('/reset-password',
    );

    return authRouter;
})();