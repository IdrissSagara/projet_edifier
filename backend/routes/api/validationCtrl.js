/**
 * https://express-validator.github.io/docs
 */
const {body, check, validationResult} = require('express-validator');

/**
 * Regarde si un paramètre n'est pas fourni comme attendu et renvoie une
 * erreur et un message au client
 * @param req
 * @param res
 * @param next
 * @returns {*|Json|Promise<any>}
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));

    return res.status(422).json({
        errors: extractedErrors,
    })
};

module.exports = {
    validate
};