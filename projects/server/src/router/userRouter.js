const express = require('express')
const Router = express.Router()

const {userController} = require('../controller')

Router.post('/register', userController.register)
Router.post('/activation/:id', userController.activation)
Router.post('/resend-otp/:id',userController.resendOtp)

module.exports = Router;