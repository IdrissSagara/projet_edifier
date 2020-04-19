const {body, check} = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'getAllUsers': {
            return [
                check('fields', 'invalid value for fields').optional().not().isNumeric().trim().escape(),
                check('offset', 'invalid value for offset').optional().isNumeric().trim().escape(),
                check('limit', 'invalid value for limit').optional().isNumeric().trim().escape(),
                check('order', 'invalid value for order').optional().optional().trim().escape(),

            ]
        }

    }
}