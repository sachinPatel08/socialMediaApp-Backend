const express = require('express')
const route = express.Router()
const useController = require('../controller/post')

const { validationResult } = require('express-validator')
const auth = require('../middleware/auth')

route.post('/createPost',auth,useController.createPost)
route.get('/allPost',useController.showPost)
route.get('/getSingalPost/:id',auth,useController.getSingalPost)
route.get('/showPost',auth,useController.postById)
route.put('/updatePost/:id',auth,useController.update)
route.delete('/deletePost/:id',auth,useController.delet)

// route.get('/viewd/:id',auth,useController.view)




module.exports = route