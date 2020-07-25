const { body } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'login': {
            return [
                body('username', 'Champ username invalide')
                    .exists().withMessage('Le Paramètre username est introuvable').bail()
                    .isLength({min: 2}).withMessage('Le Paramètre username doit avoir au moins 2 caractères')
                    .trim().escape(),
                body('password', 'Champ password invalide')
                    .exists().withMessage('Le Paramètre password est introuvable').bail()
                    .isLength({min: 4}).withMessage('Le Paramètre password doit avoir au moins 4 caractères')
                    .trim().escape(),
            ]
        }
    }
}