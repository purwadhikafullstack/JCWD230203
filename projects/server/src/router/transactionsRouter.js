const express = require('express')
const Router = express.Router();

const {transactionController, userController} = require('../controller')
const upload = require('./../middleware/upload')
const jwtVerify = require('./../middleware/decrypt')

Router.post('/booked', jwtVerify, transactionController.transaction)
Router.get('/rates', transactionController.event)
Router.post('/data', jwtVerify,transactionController.dataTransaction)
Router.patch('/payment-proof', upload, transactionController.paymentProof)


module.exports = Router;