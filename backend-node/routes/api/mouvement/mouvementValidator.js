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
                body('commentaire', 'invalid commentaire')
                    .isString().withMessage('commentaire is not alpha').bail()
                    .isLength({min: 10}).withMessage('commentaire is too short')
                    .trim().escape(),
                body('montant', 'invalid montant')
                    .exists().withMessage('parameter montant not found').bail()
                    .isNumeric().withMessage('montant is not numeric')
                    .trim().escape(),
            ]
        }
    }
};