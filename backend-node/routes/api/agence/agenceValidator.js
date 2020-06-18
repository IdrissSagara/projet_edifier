const {body, check} = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'save': {
            return [
                body('rccm', 'champ rccm invalid')
                    .exists().withMessage('Le Paramètre rccm est introuvable').bail()
                    .not().isEmpty().withMessage('Le Paramètre rccm ne peut pas être vide'),
                body('fiscal', 'champ fiscal invalid')
                    .exists().withMessage('Le Paramètre fiscal est introuvable').bail()
                    .not().isEmpty().withMessage('Le Paramètre fiscal ne peut pas être vide'),
                body('libelle', 'champ libelle invalid')
                    .optional().trim().escape(),
                body('telephone', 'champ telephone invalid')
                    .exists().withMessage('Le Paramètre telephone est introuvable').bail()
                    .not().isEmpty().withMessage('Le Paramètre telephone ne peut pas être vide'),
                body('fax', 'fax saisi est invalide')
                    .optional().trim().escape(),
                body('mail', 'Nom saisi est invalide')
                    .optional().trim().escape(),
                body('adresse', 'Nom saisi est invalide')
                    .optional().trim().escape(),
                body('logo', 'logo saisi est invalide')
                    .optional().trim().escape(),
            ]
        }
    }
}