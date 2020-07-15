const { body, check } = require('express-validator');

function isPositive(number) {
    try {
        return parseInt(number) >= 0;
    } catch (e) {
        return false;
    }
}

exports.validate = (operation) => {
    switch (operation) {
        case 'save': {
            return [
                check('id', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id est introuvable')
                    .isNumeric().withMessage('Le Paramètre id doit être numérique')
                    .trim().escape(),
                body('montant', 'Champ montant invalide')
                    .exists().withMessage('Le Paramètre montant est introuvable').bail()
                    .isNumeric().withMessage('Le Paramètre montant doit être numérique').bail()
                    .trim().escape(),
                body('commentaire', 'Champ commentaire invalide')
                    .optional().isString().withMessage('Le Paramètre commentaire doit être alphabétique')
                    .isLength({min: 10}).withMessage('Le Paramètre commentaire doit avoir au moins 10 caractères')
                    .trim().escape(),
                body('type', 'Champ type invalide')
                    .exists().withMessage('Le Paramètre type est introuvable').bail()
                    .isString().withMessage('Le Paramètre type doit être alphabétique').bail()
                    .isLength({min: 6}).withMessage('Le Paramètre type doit').bail()
                    .isIn(['cheque', 'virement', 'especes']).withMessage('Le Paramètre order doit être un parmi cheque, virement, especes')
                    .trim().escape(),
                body('date_paiement', 'Champ date_paiement invalide')
                    .optional().toDate(),
            ]
        }
        case 'getById': {
            return [
                check('id', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id est introuvable')
                    .isNumeric().withMessage('Le Paramètre id doit être numérique')
                    .trim().escape(),
                check('fields', 'Valeur invalide pour le champ fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'Valeur invalide pour le champ offset').optional().isNumeric().trim().escape(),
                check('limit', 'Valeur invalide pour le champ limit').optional().isNumeric().trim().escape(),
                check('order', 'Valeur invalide pour le champ order').optional().optional().trim().escape(),
                //.isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('must be ASC or DESC')
            ]
        }
        case 'getOnePaieOfChan': {
            return [
                check('id_paiement', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id_paiement est introuvable')
                    .isNumeric().withMessage('Le Paramètre id id_paiement not numeric')
                    .trim().escape(),
                check('id_chantier', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id_chantier est introuvable')
                    .isNumeric().withMessage('Le Paramètre id_chantier doit être numérique')
                    .trim().escape(),
                check('fields', 'Valeur invalide pour le champ fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'Valeur invalide pour le champ offset').optional().isNumeric().trim().escape(),
                check('limit', 'Valeur invalide pour le champ limit').optional().isNumeric().trim().escape(),
                check('order', 'Valeur invalide pour le champ order').optional().optional().trim().escape(),
                //.isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('must be ASC or DESC')
            ]
        }
        case 'getAllPaiements': {
            return [
                check('fields', 'Valeur invalide pour le champ fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'Valeur invalide pour le champ offset').optional().isNumeric().trim().escape(),
                check('limit', 'Valeur invalide pour le champ limit').optional().isNumeric().trim().escape(),
                check('order', 'Valeur invalide pour le champ order').optional().optional().trim().escape(),
            ]
        }
        default:
            return [
                check('prog-error', 'no validation method found for the specified name')
                    .exists()
            ]
    }
};
