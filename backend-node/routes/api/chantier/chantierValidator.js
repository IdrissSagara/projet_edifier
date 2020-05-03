const { body, check } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'saveChantier': {
            return [
                body('ClientId', 'Champ clientId invalide')
                    .exists().withMessage('Le Paramètre clientId est introuvable').bail()
                    .not().isEmpty().withMessage('Le Paramètre clientId ne peut pas être vide')
                    .isNumeric().withMessage(`Le Paramètre clientId doit être numérique`)
                    .trim().escape(),
                body('emplacement', 'Champ emplacement invalide')
                    .exists().withMessage('Le Paramètre emplacement est introuvable').bail()
                    .isString().withMessage(`Le Paramètre emplacement doit être alphabétique`)
                    .isLength({min: 2}).withMessage('Le Paramètre emplacement est trop court')
                    .trim().escape(),
                body('cout', 'Champ cout invalide(')
                    .exists().withMessage('Le Paramètre cout est introuvable').bail()
                    .isNumeric().withMessage('Le Paramètre cout doit être numériquen')
                    .trim().escape(),
                body('date_debut', 'Champ date_debut invalide')
                    .exists().withMessage('Le Paramètre date_debut est introuvable')
                    .toDate(),
                body('montant_dispo', 'Champ montant_dispo invalide')
                    .exists().withMessage('Le Paramètre montant_dispo est introuvable').bail()
                    .isNumeric().withMessage('Le Paramètre montant_dispo doit être numérique')
                    .trim().escape(),
                body('date_fin', 'Champ date_fin invalide').optional()
                    .toDate(),
                body('walita', 'Champ walita invalide').optional()
                    .isNumeric().withMessage('Le Paramètre walita doit être numérique')
                    .trim().escape(),
                body('yereta', 'Champ yereta invalide').optional()
                    .isNumeric().withMessage('Le Paramètre yereta doit être numérique')
                    .trim().escape(),
            ]   
        }
        case 'getChantier': {
            return [
                check('id', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id est introuvable').bail()
                    .isNumeric().withMessage('Le Paramètre id doit être numérique')
                    .trim().escape(),
            ] 
        }
        case 'getAllChantiers': {
            return [
                check('fields', 'Valeur invalide pour le champ fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'Valeur invalide pour le champ offset').optional().isNumeric().trim().escape(),
                check('limit', 'Valeur invalide pour le champ limit').optional().isNumeric().trim().escape(),
                check('order', 'Valeur invalide pour le champ order').optional().optional().trim().escape(),
            ]   
        }
        case 'getClient': {
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
};