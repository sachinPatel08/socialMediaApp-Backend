const express = require('express')
const route = express.Router()
const { validationResult } = require('express-validator')

const userController = require('../controller/user')
const  validator = require('../validator/validator')
const auth = require('../middleware/auth')


route.post('/login', userController.login);

// router.post('/logout', checkAuth, userController.logout)

route.post('/register',validator.register() ,userController.register)
// route.get('/show' ,auth ,userController.show)
route.get('/show/:id',auth , userController.showById)
route.put('/update',auth , userController.update)
route.get('/getUser/:id',auth , userController.getUser)
route.delete('/delete',auth , userController.delet)



route.delete('/logout',auth,userController.logout)

module.exports = route


