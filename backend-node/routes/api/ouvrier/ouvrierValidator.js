const { body, check } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'save': {
            return [ 
                body('nom', 'invalid nom')
                    .exists().withMessage('parameter nom not found').bail()
                    .isString().withMessage('nom is not alpha')
                    .isLength({min: 2}).withMessage('nom is too short')
                    .trim().escape(),
                body('prenom', 'invalid prenom')
                    .exists().withMessage('parameter prenom not found').bail()
                    .isString().withMessage('prenom is not alpha')
                    .isLength({min: 2}).withMessage('prenom is too short')
                    .trim().escape(),
                body('telephone', 'invalid phone number')
                    .exists().withMessage('parameter telephone not found').bail()
                    .isNumeric().withMessage('not numeric phone number')
                    .isLength({min: 8}).withMessage('telephone is too short')
                    .trim().escape(),
                body('type', 'invalid type number')
                    .exists().withMessage('parameter type not found').bail()
                    .isString().withMessage('type is not alpha')
                    .isLength({min: 2}).withMessage('type is too short')
                    .trim().escape(),
            ]   
        }
        case 'getById': {
            return [
                check('id', 'invalid ouvrier id')
                    .exists().withMessage('parameter id not found')
                    .isNumeric().withMessage('parameter id is not numeric')
                    .trim().escape(),
            ] 
        }
        case 'getAllOuvriers': {
            return [
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional().isNumeric().trim().escape(),
                check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
                check('order', 'invalid value for order').optional()
                //.isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('must be ASC or DESC')
                    .trim().escape(),
            ]
        }
        default:
            return [
                check('prog-error', 'no validation method found for the specified name')
                    .exists()
            ]
    }
}