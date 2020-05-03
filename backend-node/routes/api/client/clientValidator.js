/**
 * https://flaviocopes.com/express-validate-input/
 * https://flaviocopes.com/express-sanitize-input/
 * https://github.com/validatorjs/validator.js#validators
 */

//const { check } = require('express-validator');
const { body, check } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'saveClient': {
            return [
                body('nom', 'Champ nom invalide')
                    .exists().withMessage('Le Paramètre nom est introuvable').bail()
                    .isString().withMessage('Le Paramètre nom doit être numérique')
                    .isLength({min: 2}).withMessage('nom is too short')
                    .trim().escape(),
                body('prenom', 'Champ prenom invalide')
                    .exists().withMessage('Le Paramètre prenom est introuvable').bail()
                    .isString().withMessage('Le Paramètre prenom doit être numérique')
                    .isLength({min: 2}).withMessage('Le Paramètre prenom doit avoir au moins 2 caratères')
                    .trim().escape(),
                body('telephone', 'Champ telephone invalide')
                    .exists().withMessage('Le Paramètre telephone est introuvable').bail()
                    .isNumeric().withMessage('Le Paramètre telephone doit être numérique')
                    .isLength({min: 8}).withMessage('Le Paramètre telephone doit avoir au moins 8 chiffres')
                    .trim().escape(),
            ]   
        }
        case 'getClient': {
            return [
                check('id', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id est introuvable')
                    .isNumeric().withMessage('Le Paramètre id doit être numérique')
                    .trim().escape(),
            ] 
        }
        case 'getAllClients': {
            return [
                check('fields', 'Valeur invalide pour le champ fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'Valeur invalide pour le champ offset').optional().isNumeric().trim().escape(),
                check('limit', 'Valeur invalide pour le champ limit').optional().isNumeric().trim().escape(),
                check('order', 'Valeur invalide pour le champ order').optional().optional().trim().escape(),
                    //.isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('must be ASC or DESC')
            ]   
        }
        case 'search': {
            return [
                check('nom', 'Champ nom invalide')
                    .exists().withMessage('Le Paramètre nom est introuvable').bail()
                    .isString().withMessage('Le Paramètre nom doit être alphabétique')
                    .isLength({min: 3}).withMessage('Le Paramètre nom doit avoir au moins 3 caractères')
                    .trim().escape(),
            ]
        }
        case 'getChantiers': {
            return [
                check('id', 'Champ id invalide').exists().isNumeric().trim().escape(),
            ]   
        }
        default:
            return [
                check('prog-error', 'no validation method found for the specified name')
                    .exists()
            ]
    }
}