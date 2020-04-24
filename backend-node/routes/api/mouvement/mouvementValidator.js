const {body, check} = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'save': {
            return [
                body('source', 'invalid source')
                    .exists().withMessage('parameter source not found').bail()
                    .not().isEmpty().withMessage('source cannot be empty').bail()
                    .isNumeric().withMessage('source is not numeric')
                    .trim().escape(),
                body('destination', 'invalid destination')
                    .exists().withMessage('parameter destination not found').bail()
                    .not().isEmpty().withMessage('destination cannot be empty').bail()
                    .isNumeric().withMessage('destination is not numeric')
                    .trim().escape(),
                body('montant', 'invalid montant')
                    .exists().withMessage('parameter montant not found').bail()
                    .not().isEmpty().withMessage('montant cannot be empty').bail()
                    .isNumeric().withMessage('montant is not numeric')
                    .trim().escape(),
                body('commentaire', 'invalid commentaire').optional()
                    .isString().withMessage('commentaire is not alpha').bail()
                    .isLength({min: 10}).withMessage('commentaire is too short')
                    .trim().escape(),
            ]
        }
        case 'getAllMouvement': {
            return [
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional().isNumeric().trim().escape(),
                check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
                check('order', 'invalid value for order').optional().optional().trim().escape(),
            ]
        }
        case 'getMouvement': {
            return [
                check('id', 'invalid mouvement id')
                    .exists().withMessage('parameter id not found').bail()
                    .isNumeric().withMessage('parameter id is not numeric')
                    .trim().escape(),
            ]
        }
    }
}