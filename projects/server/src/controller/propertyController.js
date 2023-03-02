const {Op} = require('sequelize')
const {Sequelize} = require('./../sequelize/models')
const db = require('../sequelize/models')   
const { offset } = require('@popperjs/core')
const property = db.property


module.exports = {
    getAllProperty: async(req, res) => {
        const { page = 1} = req.query;
        const page_size = 10
        const offset = (page-1) * page_size;
        const limit = page_size

        try {
            const {rows: properties} = await property.findAndCountAll({
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

            const total_count = await property.count(); // get total number of properties
            const total_pages = Math.ceil(total_count / page_size); // calculate total number of pages

            return res.status(200).send({
                isError: false,
                message: 'Get all Properties Success',
                data: properties,
                total_data: total_count,
                total_pages
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
        const {type = 1, page = 1} = req.query;
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

            const total_count = await property.count({where: {type_id: type}}); // get total number of properties
            const total_pages = Math.ceil(total_count / page_size); // calculate total number of pages

            return res.status(200).send({
                isError: false,
                message: "Get data by type Success",
                data: properties,
                total_data: total_count,
                total_pages
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

    getPropertyByName: async(req, res) => {
            const {page = 1, name } = req.query;
            const page_size = 10;
            const offset = (page - 1) * page_size;
            const limit = page_size;
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
                        include:[
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
                // Op.ilke not casesensitive, so it will get all property
                where: name ? {name: {[Op.like] : `%${name}%`} } : {},
                offset,
                limit
            })

            const total_count = await property.count();
            const total_pages = Math.ceil(total_count / page_size) 

            return res.status(200).send({
                isError: false,
                message: "Get all properties success",
                data: properties,
                total_data: total_count,
                total_pages
            });
        } catch (error) {
            return res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    
    getPropertyByRooms: async(req, res) => {
        const { room_id } = req.query
        try {
            const rooms = await db.room.findAll({
                where: {id: room_id},
                include: [
                    {
                        model: db.room_image,
                        as: 'room_images'
                    }
                ]
            });

            res.status(200).send({
                isError: false,
                message: "Get Room details Success",
                data: rooms
            })
            
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }

    },

    getRoomByQuery: async(req, res) => {
        const {property_name, price_min, price_max, sort_order, page = 1} = req.query;

        const page_size = 10
        const offset = (page - 1) * page_size;
        const limit = page_size
    
        try{
            let order = [];
    
            if(sort_order){
                if(sort_order === "asc" || sort_order === "desc"){
                    order.push(['price', sort_order]);
                }else{
                    throw { message: "Invalid sort order" };
                }
            }
    
            const rooms = await db.room.findAll({
                where: {
                    price:{
                        [Op.gte]: price_min,
                        [Op.lte]: price_max
                    },
                    '$property.name$': { [Op.like]: `%${property_name}%` }
                },
                include: [
                    {
                    model: property,
                    as: 'property',
                    attributes: ['name']
                    }
            ],
                order: order,
                offset,
                limit
            })

            const total_count = await db.room.count();
            const total_pages = Math.ceil(total_count / page_size) 
    
            return res.status(200).json({
                isError: false,
                message: "Get room by query success",
                data: rooms,
                total_count,
                total_pages
            });
        } catch (error) {
            return res.status(400).json({
                isError: true,
                message: error.message,
                data: null
            });
        }
    },
    
      
}