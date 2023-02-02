const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')
const useController = require('../controller/followers') 


route.post('/follow/:id',auth,useController.savefollow)
route.get('/showFollower',auth,useController.showFollower)
route.delete('/unfollow/:id',auth,useController.unFollow)


module.exports = route;