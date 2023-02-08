const express = require('express')
const route = express.Router()
const useController = require('../controller/post')
const  validator = require('../validator/postValidator')
const auth = require('../middleware/auth')

route.post('/createPost',validator.postValidator(),auth,useController.createPost)
route.get('/allPost',useController.showPost)
route.get('/getPost/:id',auth,useController.getSingalPost)
route.get('/showPost',auth,useController.postById)
route.put('/updatePost/:id',auth,useController.update)
route.delete('/deletePost/:id',auth,useController.delet)

// route.get('/viewd/:id',auth,useController.view)




module.exports = route