const {check, body} = require('express-validator');

const postValidator = () => {
    const valid = [
        check('title').not().isEmpty().withMessage('Please enter the title.'),
        check('content').not().isEmpty().withMessage('Please enter the content.')
    ]
    return valid;
}

module.exports={postValidator}
    