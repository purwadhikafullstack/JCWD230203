const express = require('express')
const Router = express.Router();

const jwtVerify = require('./../middleware/decrypt')
const upload = require('./../middleware/uploadProperty')

const {propertyController} = require('../controller')

Router.get('/getAll', propertyController.getAllProperty)
Router.get('/getType', propertyController.getPropertyType)
Router.get('/details', propertyController.getPropertyDetails)
Router.get('/search', propertyController.getPropertyByName)
Router.get('/room-details', propertyController.getPropertyByRooms)
Router.get('/search-rooms', propertyController.getRoomByQuery)
Router.get('/search-date', propertyController.getRoomByDateAndLocation)
Router.get('/city', propertyController.getCity)
Router.post('/create-property', jwtVerify, upload, propertyController.createProperty)


module.exports = Router;