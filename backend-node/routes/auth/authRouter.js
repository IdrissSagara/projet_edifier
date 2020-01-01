var express = require('express');
var loginCtrl = require('./login');
var registerCtrl = require('./register');
// const loginValidator = require('./validators/clientValidator');
const registerValidator = require('./validators/registerValidator');

exports.router = (function() {
    var authRouter = express.Router();

    /**
     * Route for login
     */
    authRouter.post('/login', loginCtrl.login);

    /**
     * Route for register
     */
    authRouter.post('/register',
        registerValidator.validate('register'),
        registerCtrl.register);

    return authRouter;
})();