/**
 * https://flaviocopes.com/express-validate-input/
 * https://flaviocopes.com/express-sanitize-input/
 * https://github.com/validatorjs/validator.js#validators
 */

//const { check } = require('express-validator');
const {body, check} = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'get': {
            return [
                check('id', 'Champ id invalide')
                    .exists().withMessage('Le Paramètre id est introuvable')
                    .isNumeric().withMessage('Le Paramètre id doit être numérique')
                    .trim().escape(),
            ]
        }
        default:
            return [
                check('prog-error', 'no validation method found for the specified name')
                    .exists()
            ]
    }
};