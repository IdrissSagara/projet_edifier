const {body, check} = require('express-validator');

function positiveNum(value, {req, loc, path}) {
    if (value < 0) {
        throw new Error('Entrez une valeur positive');
    } else {
        return value;
    }
}

exports.validate = (operation) => {
    switch (operation) {
        case 'save': {
            return [
                body('source', 'Champ source invalid')
                    .exists().withMessage('Le Paramètre source est introuvable').bail()
                    .not().isEmpty().withMessage('Le Paramètre source ne peut pas être vide').bail()
                    .isNumeric().withMessage('Le Paramètre source doit être numérique')
                    .custom(positiveNum).trim().escape(),
                body('destination', 'Champ destination invalid')
                    .exists().withMessage('Le Paramètre destination introuvable').bail()
                    .not().isEmpty().withMessage('Le Paramètre destination ne peut pas être vide').bail()
                    .isNumeric().withMessage('Le Paramètre destination doit être numérique')
                    .custom((value, {req, loc, path}) => {
                        if (value === req.body.source) {
                            // example from https://stackoverflow.com/a/46013025
                            throw new Error('Selectionnez une destination differente de la source');
                        } else {
                            return value;
                        }
                    }).custom(positiveNum).trim().escape(),
                body('montant', 'Champ montant invalide')
                    .exists().withMessage('Le Paramètre parameter est introuvable').bail()
                    .not().isEmpty().withMessage('Le Paramètre montant ne peut pas être vide').bail()
                    .isNumeric().withMessage('Le Paramètre montant doit être numérique')
                    .custom(positiveNum).trim().escape(),
                body('commentaire', 'Champ commentaire').optional()
                    .isString().withMessage('Le Paramètre commentaire doit être alphabétique').bail()
                    .isLength({min: 10}).withMessage('Le Paramètre commentaire doit avoir au moins 10 caratères')
                    .trim().escape(),
            ]
        }
        case 'getAllMouvement': {
            return [
                check('fields', 'Valeur invalide pour le champ fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'Valeur invalide pour le champ offset').optional().isNumeric()
                    .custom(positiveNum).trim().escape(),
                check('limit', 'Valeur invalide pour le champ limit').optional().isNumeric()
                    .custom(positiveNum).trim().escape(),
                check('order', 'Valeur invalide pour le champ order').optional().optional().trim().escape(),
            ]
        }
        case 'getMouvement': {
            return [
                check('id', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id est introuvable').bail()
                    .isNumeric().withMessage('Le Paramètre id doit être numérique')
                    .trim().escape(),
            ]
        }
    }
};