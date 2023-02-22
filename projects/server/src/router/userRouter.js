const express = require('express')
const Router = express.Router()

const {userController} = require('../controller')

Router.post('/register', userController.register)

module.exports = Router;