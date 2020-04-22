const {body, check} = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'getAllUsers': {
            return [
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional().isNumeric().trim().escape(),
                check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
                check('order', 'invalid value for order').optional().optional().trim().escape(),

            ]
        }
        case 'getUser': {
            return [
                check('id', 'invalid user id')
                    .exists().withMessage('parameter id not found').bail()
                    .isNumeric().withMessage('parameter id is not numeric')
                    .trim().escape(),
            ]
        }
        case 'update': {
            return [
                body('id', 'invalid user id')
                    .exists().withMessage('parameter id not found').bail()
                    .not().isEmpty().withMessage('user id cannot be empty')
                    .isNumeric().withMessage('user id is not numeric')
                    .trim().escape(),
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
            ]
        }

    }
}