const express = require('express')
const route = express.Router()
const { GetAllAccount, UserPost, retrieveUserbyId, updateUserById, deleteUser} = require('../controller/user.controller')
const { CheckPost } = require('../middleware/middleware')


route.get('/', GetAllAccount)
route.post('/', CheckPost, UserPost)
route.get('/:user_id', retrieveUserbyId)
route.put('/:user_id', updateUserById)
route.delete('/:user_id', deleteUser)


module.exports = route