const {body, check} = require('express-validator');

exports.validate = (operation) => {
    switch (operation) {
        case 'send': {
            return [
                body('name', 'Invalid name')
                    .exists().withMessage('parameter name not found')
                    .isLength({min: 2}).withMessage('name is too short')
                    .isString().withMessage('parameter name is not alphabetic')
                    .trim().escape(),
                body('email', 'invalid email')
                    .exists().withMessage('parameter email not found').bail()
                    .isEmail().withMessage('email is not valid').bail()
                    .trim().escape(),
                body('phone', 'invalid phone number')
                    .isMobilePhone("any").withMessage('phone is not valid')
                    .trim().escape(),
                body('subject', 'invalid subject')
                    .exists().withMessage('parameter type not found').bail()
                    .isString().withMessage('type is not alpha')
                    .isLength({min: 2}).withMessage('type is too short')
                    .trim().escape(),
                body('message', 'invalid message')
                    .exists().withMessage('message is missing')
                    .isLength({min: 10}).withMessage('message is too short')
                    .trim().escape(),
            ]
        }
    }
};
