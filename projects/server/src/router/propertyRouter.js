const express = require('express')
const Router = express.Router();

const {propertyController} = require('../controller')

Router.get('/getAll', propertyController.getAllProperty)
Router.get('/getType', propertyController.getPropertyType)
Router.get('/details', propertyController.getPropertyDetails)
Router.get('/search', propertyController.getPropertyByName)
Router.get('/room-details', propertyController.getPropertyByRooms)
Router.get('/search-rooms', propertyController.getRoomByQuery)
Router.get('/search-date', propertyController.getRoomByDateAndLocation)
Router.get('/city', propertyController.getCity)
module.exports = Router;