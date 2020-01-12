const { body } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'login': {
            return [ 
                body('username', 'invalid username')
                    .exists().withMessage('parameter username not found').bail()
                    .isLength({min: 2}).withMessage('username is too short')
                    .trim().escape(),
                body('password', 'invalid password')
                    .exists().withMessage('parameter password not found').bail()
                    .isLength({min: 4}).withMessage('prenom is too short')
                    .trim().escape(),
            ]
        }
    }
}