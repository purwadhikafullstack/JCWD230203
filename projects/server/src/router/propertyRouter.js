const express = require('express')
const Router = express.Router();

const {propertyController} = require('../controller')

Router.get('/getAll', propertyController.getAllProperty)
Router.get('/getType', propertyController.getPropertyType)
Router.get('/details', propertyController.getPropertyDetails)
module.exports = Router;