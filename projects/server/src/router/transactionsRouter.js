const express = require('express')
const Router = express.Router();

const {transactionController} = require('../controller')
const upload = require('./../middleware/upload')
const jwtVerify = require('./../middleware/decrypt')

Router.post('/booked', jwtVerify, transactionController.transaction)


module.exports = Router;