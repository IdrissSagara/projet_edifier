var express = require('express');
var loginCtrl = require('./loginCtrl');
var registerCtrl = require('./register');
let resetPwdCtrl = require('./resetPwdCtrl');
// Validators
const loginValidator = require('./validators/loginValidator');
const registerValidator = require('./validators/registerValidator');

const accessControl = require('./accessControl');
const roles = accessControl.roles;
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
        accessControl.canAccess([roles.ADMIN]),
        registerCtrl.register);

    authRouter.post('/reset-password',
        registerValidator.validate('resetPwd'),
        accessControl.canAccess([roles.ALL]),
        resetPwdCtrl.resetPwd
    );

    return authRouter;
})();