
const {check, body} = require('express-validator');
const userPost = ()=>{
    const validPost = [
        check('title').not().isEmpty().withMessage('Please enter the title.'),
        check('content').not().isEmpty().withMessage('Please enter the content.')
    ]
    return validPost
    }

    module.exports = {userPost}