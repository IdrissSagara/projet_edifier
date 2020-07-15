const { body } = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'register': {
            return [
                body('nom', 'Champ nom invalide')
                    .exists().withMessage('Le Paramètre nom est introuvable')
                    .isString().withMessage('Le Paramètre nom doit être alphabétique')
                    .isLength({min: 2}).withMessage('Le Paramètre nom doit avoir au moins 2 caractères')
                    .trim().escape(),
                body('prenom', 'Champ prenom invalide')
                    .exists().withMessage('Le Paramètre prenom est introuvable')
                    .isString().withMessage('Le Paramètre prenom doit être alphabétique')
                    .isLength({min: 2}).withMessage('Le Paramètre prenom doit avoir au moins 2 caractères')
                    .trim().escape(),
                body('username', 'Champ username invalide')
                    .exists().withMessage('Le Paramètre username est introuvable')
                    .isString().withMessage('Le Paramètre username doit être alphabétique')
                    .isLength({min: 2}).withMessage('Le Paramètre username doit avoir au moins 2 caractères')
                    .trim().escape(),
                body('password', 'Champ password invalide')
                    .exists().withMessage('Le Paramètre password est introuvable')
                    .isLength({min: 4}).withMessage('Le Paramètre password doit avoir au moins 4 caractères')
                    .trim().escape(),
                body('role', 'Champ role invalide')
                    .exists().withMessage('Le Paramètre role est introuvable')
                    .isIn(['admin', 'basic-user', 'medium-user', 'advanced-user'])
                    .withMessage('Le Paramètre role doit être un de la liste admin, basic-user, medium-user, advanced-user')
                    .trim().escape(),
            ]   
        }
        case 'resetPwd': {
            return [
                body('username', 'Champ username invalide')
                    .exists().withMessage('Le Paramètre username est introuvable')
                    .isString().withMessage('Le Paramètre username doit être numérique')
                    .isLength({min: 2}).withMessage('Le Paramètre username doit avoir au moins 2 caractères')
                    .trim().escape(),
                body('oldPassword', 'Champ oldPassword invalide')
                    .exists().withMessage('Le Paramètre oldPassword est introuvable')
                    .isLength({min: 4}).withMessage('Le Paramètre oldPassword doit avoir au moins 4 caractères')
                    .trim().escape(),
                body('newPassword', 'Champ newPassword invalide')
                    .exists().withMessage('Le Paramètre newPassword est introuvable')
                    .isLength({min: 4}).withMessage('Le Paramètre newPassword doit avoir au moins 4 caractères')
                    .trim().escape(),
            ]
        }
    }
};
