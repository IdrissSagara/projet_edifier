/**
 * https://flaviocopes.com/express-validate-input/
 * https://flaviocopes.com/express-sanitize-input/
 */

//const { check } = require('express-validator');
const { body, check } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'saveClient': {
            return [ 
                body('nom', 'invalid nom')
                    .exists().withMessage('parameter nom not found')
                    .isAlpha().withMessage('nom is not alpha')
                    .isLength({min: 2}).withMessage('nom is too short')
                    .trim().escape(),
                body('prenom', 'invalid prenom')
                    .exists().withMessage('parameter prenom not found')
                    .isAlpha().withMessage('prenom is not alpha')
                    .isLength({min: 2}).withMessage('prenom is too short')
                    .trim().escape(),
                body('telephone', 'invalid phone number')
                    .exists().withMessage('parameter telephone not found')
                    .isNumeric().withMessage('not numeric phone number')
                    .isLength({min: 8}).withMessage('telephone is too short')
                    .trim().escape(),
            ]   
        }
        case 'getClient': {
            return [ 
                check('id', 'invalid client id')
                    .exists().withMessage('parameter id not found')
                    .isNumeric().withMessage('parameter id is not numeric')
                    .trim().escape(),
            ] 
        }
        case 'getAllClients': {
            return [ 
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional().isNumeric().trim().escape(),
                check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
                check('order', 'invalid value for order').optional().isNumeric().trim().escape(),
            ]   
        }
        case 'getChantiers': {
            return [ 
                check('id', 'invalid client id').exists().isNumeric().trim().escape(),,
            ]   
        }
        default:
            return [
                check('prog-error', 'no validation method found for the specified name')
                    .exists()
            ]
    }
}