const { body, check } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'register': {
            return [ 
                body('nom', 'invalid nom')
                    .exists().withMessage('parameter nom not found')
                    .isString().withMessage('nom is not a string')
                    .isLength({min: 2}).withMessage('nom is too short')
                    .trim().escape(),
                body('prenom', 'invalid prenom')
                    .exists().withMessage('parameter prenom not found')
                    .isString().withMessage('prenom is not a string')
                    .isLength({min: 2}).withMessage('prenom is too short')
                    .trim().escape(),
                body('username', 'invalid username')
                    .exists().withMessage('parameter username not found')
                    .isString().withMessage('username is not alpha')
                    .isLength({min: 2}).withMessage('username is too short')
                    .trim().escape(),
                body('password', 'invalid password')
                    .exists().withMessage('parameter password not found')
                    .isString().withMessage('password is not a string')
                    .isLength({min: 3}).withMessage('password must be at least 3 long')
                    .trim().escape(),
                body('role', 'invalid role')
                    .exists().withMessage('parameter role not found')
                    .isIn(['admin', 'basic-user', 'medium-user', 'advanced-user']).withMessage('role must be one of admin, basic-user, medium-user, advanced-user')
                    .trim().escape(),
            ]   
        }
    }
}