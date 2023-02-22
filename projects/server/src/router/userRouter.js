const express = require('express')
const Router = express.Router()

const {userController} = require('../controller')

Router.post('/register', userController.register)
Router.post('/activation/:id', userController.activation)

module.exports = Router;