const {check, body} = require('express-validator');

const register = () => {
    const valid = [
    check('userName').not().isEmpty().withMessage('Please enter last name.'),
    check('email').not().isEmpty().withMessage('Please enter email.').normalizeEmail().isEmail().withMessage('Enter valid email.'),
    check('password').not().isEmpty().withMessage('Please enter password.').isLength({min:6}).withMessage("Password should be atleast 6 characters long."),
    ]
    return valid;
}

module.exports={register}