const { body, check } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'saveChantier': {
            return [
                body('ClientId', 'invalid clientId')
                    .exists().withMessage('parameter clientId not found').bail()
                    .not().isEmpty().withMessage('clientId cannot be empty')
                    .isNumeric().withMessage('clientId is not numeric')
                    .trim().escape(),
                body('emplacement', 'invalid emplacement')
                    .exists().withMessage('parameter emplacement not found').bail()
                    .isString().withMessage('emplacement is not alpha')
                    .isLength({min: 2}).withMessage('emplacement is too short')
                    .trim().escape(),
                body('cout', 'invalid cout')
                    .exists().withMessage('parameter cout not found').bail()
                    .isNumeric().withMessage('cout is not numeric')
                    .trim().escape(),
                body('date_debut', 'invalid date_debut')
                    .exists().withMessage('parameter date_debut not found')
                    .toDate(),
                body('montant_dispo', 'invalid montant_dispo')
                    .exists().withMessage('parameter montant_dispo not found').bail()
                    .isNumeric().withMessage('montant_dispo is not numeric')
                    .trim().escape(),
                body('date_fin', 'invalid phone number').optional()
                    .toDate(),
                body('walita', 'invalid walita').optional()
                    .isNumeric().withMessage('walita is not numeric')
                    .trim().escape(),
                body('yereta', 'invalid yereta').optional()
                    .isNumeric().withMessage('yereta is not numeric')
                    .trim().escape(),
            ]   
        }
        case 'getChantier': {
            return [ 
                check('id', 'invalid chantier id')
                    .exists().withMessage('parameter id not found').bail()
                    .isNumeric().withMessage('parameter id is not numeric')
                    .trim().escape(),
            ] 
        }
        case 'getAllChantiers': {
            return [ 
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional().isNumeric().trim().escape(),
                check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
                check('order', 'invalid value for order').optional().optional().trim().escape(),
            ]   
        }
        case 'getClient': {
            return [ 
                check('id', 'invalid client id').exists().isNumeric().trim().escape(),
            ]   
        }
        default:
            return [
                check('prog-error', 'no validation method found for the specified name')
                    .exists()
            ]
    }
}