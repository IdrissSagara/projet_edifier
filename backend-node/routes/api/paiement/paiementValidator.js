const { body, check } = require('express-validator');

function isPositive(number) {
    try {
        return parseInt(number) > 0;
    } catch (e) {
        return false;
    }
}

exports.validate = (operation) => {
    switch (operation) {
        case 'save': {
            return [
                body('id', 'invalid chantier id')
                    .exists().withMessage('parameter id not found')
                    .isNumeric().withMessage('parameter id is not numeric')
                    .trim().escape(),
                body('montant', 'invalid montant')
                    .exists().withMessage('parameter montant not found').bail()
                    .isNumeric().withMessage('montant is not numeric').bail()
                    .trim().escape(),
                body('commentaire', 'invalid commentaire')
                    .optional().isString().withMessage('prenom is not alpha')
                    .isLength({min: 2}).withMessage('commentaire is too short')
                    .trim().escape(),
                body('type', 'invalid type number')
                    .exists().withMessage('parameter type not found').bail()
                    .isString().withMessage('type is not alpha')
                    .isLength({min: 2}).withMessage('type is too short')
                    .trim().escape(),
                body('date_paiement', 'invalid date_paiement date')
                    .optional().toDate(),
            ]
        }
        case 'getById': {
            return [
                check('id', 'invalid paiement id')
                    .exists().withMessage('parameter id not found')
                    .isNumeric().withMessage('parameter id is not numeric')
                    .trim().escape(),
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional().isNumeric().trim().escape(),
                check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
                check('order', 'invalid value for order').optional()
                //.isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('must be ASC or DESC')
                    .trim().escape(),
            ]
        }
        case 'getAllPaiements': {
            return [
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional()
                    .isNumeric().custom(offset => {
                        if (!isPositive(offset)) {
                            throw new Error('Offset must be positive');
                        }
                }).bail().trim().escape(),
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
};
