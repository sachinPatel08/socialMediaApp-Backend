const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const useController = require('../controller/coment')


router.post('/comment/:id',auth,useController.pushComment)
router.get('/showComment',auth,useController.showComent)
// router.get('/showComment/:id',auth,useController.showComById)
router.get('/showCommentByPost/:id',auth,useController.showCommentByPost)
router.delete('/deleteComment/:id',auth,useController.deleteComment)

module.exports = router;