const express = require('express')
const Router = express.Router();

const {tenantController} = require('../controller')

const upload = require('./../middleware/upload')

Router.post('/register', upload, tenantController.register)
Router.post('/tenant-activation/:id', tenantController.activation)
Router.post('/resend-otp/:id', tenantController.resendOtp)
Router.post('/login', tenantController.Login)

module.exports = Router;