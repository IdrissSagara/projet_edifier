const { body, check } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'save': {
            return [
                body('nom', 'Champ nom invalide')
                    .exists().withMessage('Le Paramètre nom est introuvable').bail()
                    .isString().withMessage('Le Paramètre nom doit être alphabétique')
                    .isLength({min: 2}).withMessage('Le Paramètre nom doit avoir au moins 2 caratères')
                    .trim().escape(),
                body('prenom', 'Champ prenom invalide')
                    .exists().withMessage('Le Paramètre prenom est introuvable').bail()
                    .isString().withMessage('Le Paramètre prenom doit être alphabétique')
                    .isLength({min: 2}).withMessage('Le Paramètre prenom doit avoir au moins 2 caractères')
                    .trim().escape(),
                body('telephone', 'Champ telephone invalide')
                    .exists().withMessage('Le Paramètre telephone est introuvable').bail()
                    .isNumeric().withMessage('Le Paramètre telephone doit être numérique')
                    .isLength({min: 8}).withMessage('Le Paramètre telephone doit avoir au moins 8 chiffres')
                    .trim().escape(),
                body('type', 'Champ type invalide')
                    .exists().withMessage('Le Paramètre type est introuvable').bail()
                    .isString().withMessage('Le Paramètre type doit être alphabétique')
                    .isLength({min: 2}).withMessage('Le Paramètre type doit avoir au moins 2 caractères')
                    .trim().escape(),
            ]   
        }
        case 'getById': {
            return [
                check('id', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id est introuvable')
                    .isNumeric().withMessage('Le Paramètre id doit être numérique')
                    .trim().escape(),
            ] 
        }
        case 'getAllOuvriers': {
            return [
                check('fields', 'Valeur invalide pour le champ fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'Valeur invalide pour le champ offset').optional().isNumeric().trim().escape(),
                check('limit', 'Valeur invalide pour le champ limit').optional().isNumeric().trim().escape(),
                check('order', 'Valeur invalide pour le champ order').optional().optional().trim().escape(),
                //.isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('Le Paramètre order doit être un parmi ASC, DESC, asc, desc')
            ]
        }
        default:
            return [
                check('prog-error', 'no validation method found for the specified name')
                    .exists()
            ]
    }
}