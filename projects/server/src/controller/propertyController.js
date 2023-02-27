const {Op} = require('sequelize')
const {Sequelize} = require('./../sequelize/models')
const db = require('../sequelize/models')   
const property = db.property


module.exports = {
    getAllProperty: async(req, res) => {
        const { page = 1} = req.query;

        let page_size = 10

        const offset = (page-1) * page_size;
        const limit = page_size
        try {
            const properties = await property.findAll({
                include: [
                    {
                        model: db.property_image,
                        as: 'property_images'
                    },
                    {
                        model: db.room,
                        as: 'rooms',
                        include: [
                            {
                                model: db.room_image,
                                as: 'room_images'
                            }
                        ]
                    },
                    {
                        model: db.location,
                        as: 'locations',
                        include: [
                            {
                                model: db.city,
                                as: 'city'
                            }
                        ]
                    }
                ],
                offset,
                limit
            })
            return res.status(200).send({
                isError: false,
                message: 'Get all Properties Success',
                data: properties
            })

        } catch (error) {
            return res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    getPropertyType: async(req, res) => {
        const {type = 1} = req.query;
        
        const page = 1
        let page_size = 10

        const offset = (page-1) * page_size;
        const limit = page_size
        try {
            const properties = await property.findAll({
                where: {type_id: type},
                include: [
                    {
                        model: db.property_image,
                        as: 'property_images'
                    },
                    {
                        model: db.room,
                        as: 'rooms',
                        include: [
                            {
                                model: db.room_image,
                                as: 'room_images'
                            }
                        ]
                    },
                    {
                        model: db.location,
                        as: 'locations',
                        include: [
                            {
                                model: db.city,
                                as: 'city'
                            }
                        ]
                    }
                ],
                offset,
                limit
            })
            return res.status(200).send({
                isError: false,
                message: "Get data by type Success",
                data: properties
            })

        } catch (error) {
            return res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    getPropertyDetails: async(req, res) => {
        const { property_id } = req.query;
        console.log(req.query)
        try {
            const properties = await property.findOne({
                where:{id: property_id},
                include: [
                    {
                        model: db.property_image,
                        as: 'property_images'
                    },
                    {
                        model: db.room,
                        as: 'rooms',

                        include: [
                           {
                               model: db.room_image,
                               as: 'room_images'
                           }
                        ]
                    },
                    {
                        model: db.location,
                        as: 'locations',
                        include: [
                            {
                                model: db.city,
                                as: 'city'
                            }
                        ]
                    }
                ]
            })
            return res.status(200).send({
                isError: false,
                message: "Get property details Success",
                data: properties
            })
        } catch (error) {
            return res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
}