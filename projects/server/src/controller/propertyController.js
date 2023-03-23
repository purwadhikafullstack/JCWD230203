const { Op } = require("sequelize");
const { sequelize } = require("./../sequelize/models");
const db = require("../sequelize/models");
const { offset } = require("@popperjs/core");
const { query } = require("express");
const moment = require("moment");
const deleteFiles = require("../helpers/deleteFilesProperty");
const property = db.property;

module.exports = {
  getAllProperty: async (req, res) => {
    const { page = 1 } = req.query;
    const page_size = 9;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      const { rows: properties } = await property.findAndCountAll({
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",
            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
        offset,
        limit,
      });

      const total_count = await property.count(); // get total number of properties
      const total_pages = Math.ceil(total_count / page_size); // calculate total number of pages

      return res.status(200).send({
        isError: false,
        message: "Get all Properties Success",
        data: properties,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyType: async (req, res) => {
    const { type = 1, page = 1 } = req.query;
    let page_size = 10;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const properties = await property.findAll({
        where: { type_id: type },
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",
            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
        offset,
        limit,
      });

      const total_count = await property.count({ where: { type_id: type } }); // get total number of properties
      const total_pages = Math.ceil(total_count / page_size); // calculate total number of pages

      return res.status(200).send({
        isError: false,
        message: "Get data by type Success",
        data: properties,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyDetails: async (req, res) => {
    const { property_id } = req.query;

    try {
      const properties = await property.findOne({
        where: { id: property_id },
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",

            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
      });
      return res.status(200).send({
        isError: false,
        message: "Get property details Success",
        data: properties,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyByName: async (req, res) => {
    const { page = 1, name } = req.query;
    const page_size = 10;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const properties = await property.findAll({
        include: [
          {
            model: db.property_image,
            as: "property_images",
          },
          {
            model: db.room,
            as: "rooms",
            include: [
              {
                model: db.room_image,
                as: "room_images",
              },
            ],
          },
          {
            model: db.location,
            as: "locations",
            include: [
              {
                model: db.city,
                as: "city",
              },
            ],
          },
        ],
        where: name ? { name: { [Op.like]: `%${name}%` } } : {},
        offset,
        limit,
      });

      const total_count = await property.count();
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).send({
        isError: false,
        message: "Get all properties success",
        data: properties,
        total_data: total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getPropertyByRooms: async (req, res) => {
    const { room_id } = req.query;

    try {
      const rooms = await db.room.findAll({
        where: { id: room_id },
        include: [
          {
            model: db.room_image,
            as: "room_images",
          },
          {
            model: property,
            as: "property",
            include: [
              {model: db.tenant},
              {model: db.location,
              include: {model: db.city}}
            
            ]
          }
        ]
        ,
      });

      res.status(200).send({
        isError: false,
        message: "Get Room details Success",
        data: rooms
      });
    } catch (error) {
      res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getRoomByQuery: async (req, res) => {

    const {
      property_name,
      price_min,
      price_max,
      sort_order,
      page = 1,
    } = req.query;
    
    console.log(req.body);
    
    const page_size = 20;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    
    try {
      let order = [];
    
      if (sort_order) {
        if (sort_order === "asc" || sort_order === "desc") {
          order.push(["price", sort_order]);
        } else {
          throw { message: "Invalid sort order" };
        }
      }
    
      const rooms = await db.room.findAll({
        where: {
          price: {
            [Op.gte]: price_min,
            [Op.lte]: price_max,
          },
          "$property.name$": { [Op.like]: `%${property_name}%` },
        },
        include: [
          {
            model: db.room_image,
            as: "room_images",
          },
          {
            model: property,
            as: "property",
          },
        ],
        order: order,
        offset,
        limit,
        subQuery: false,
      });

    
      if (rooms.length === 0) {
        return res.status(400).send({
          isError: true,
          message: "There is No Room Match the Criteria ",
          data: rooms,
        });
      }
    
      const total_count = await db.room.count();
      const total_pages = Math.ceil(total_count / page_size);
    
      return res.status(200).json({
        isError: false,
        message: "Get room by query success",
        data: rooms,
        total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).json({
        isError: true,
        message: error.message,
        data: null,
      });
    }
    },
  

  getRoomByDateAndLocation: async (req, res) => {
    const { check_in, check_out, city, page = 1 } = req.query;
    let page_size = 10;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      if(!check_in || !check_out || !city || !page){
        return res.status(400).send({
          isError: true,
          message: "Field cannot Empty",
          data: null
        })
      }
      const transaction = await db.location.findAll({
        where: { city_id: city },
        include: [
          {
            model: db.property,
            include: [
              {
                model: db.property_image
              },
              {
                model: db.room,
                include: [
                  {
                    model: db.room_image,
                  },
                  {
                    model: db.transactions,
                    where: {
                      [Op.or]: [
                        {
                          check_in: {
                            [Op.between]: [check_in, check_out],
                          },
                        },
                        {
                          check_out: {
                            [Op.between]: [check_in, check_out],
                          },
                        },
                      ],
                    },
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
        offset,
        limit,
      });


      const total_count = await db.location.count();
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).json({
        isError: false,
        message: "Get room by query success",
        data: 
        transaction,
        total_count,
        total_pages,
      });
    } catch (error) {
      return res.status(400).json({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },


  createProperty: async(req, res) => {
    const {name, address, description, type_id, city_id, city_name, location, property_accommodation
    } = req.body;
    console.log(req.body)
    const id = req.dataToken.id
    const t = await sequelize.transaction();
    try {

      if(city_name !== ""){
        let city = await db.city.findOne({ where: { city: city_name } });
      if (!city) {
        city = await db.city.create({ city: city_name }, { transaction: t });
        }
      }

        let createProperty = await db.property.create({
          name,
          address,
          description,
          type_id,
          tenant_id: id
        }, {transaction: t})


        let images = req.files.PROPERTY
        for(let i = 0; i < images.length; i++){
          let createPropertyImg = await db.property_image.create({
            image_path: images[i].filename,
            property_id: createProperty.dataValues.id
          }, {transaction: t})
          console.log(createPropertyImg)
        }

        let createLocation = await db.location.create({
          name: location,
          city_id,
          property_id: createProperty.dataValues.id
        }, {transaction: t})

        // const propertyAccommodationArr = property_accommodation.split(',').map(Number);
        // for(let i = 0; i < propertyAccommodationArr.length; i++){
        //   let createConnector = await db.property_connector.create({
        //     property_id: createProperty.dataValues.id,
        //     property_accommodation_id: propertyAccommodationArr[i]
        //   }, {transaction: t})
        //   console.log(createConnector)
        // }
        

        await t.commit();
        return res.status(200).send({
          isError: false,
          message: "Create Property Successful",
          data: 
          {createProperty, 
          // createPropertyImg,
          createLocation,}
          // createConnector}
        })

    } catch (error) {
      await t.rollback()
      deleteFiles(req.files)
      return res.status(400).send({
        isError: true,
        message: error.message,
        datA: null
      })
    }
  },

  getCity: async (req, res) => {
    try {
      const cities = await db.city.findAll({});

      return res.status(200).send({
        isError: false,
        message: "Get City Success",
        data: cities,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },
};



// const {
//   property_name,
//   price_min,
//   price_max,
//   sort_order,
//   page = 1,
// } = req.query;

// console.log(req.body);

// const page_size = 10;
// const offset = (page - 1) * page_size;
// const limit = page_size;

// try {
//   let order = [];

//   if (sort_order) {
//     if (sort_order === "asc" || sort_order === "desc") {
//       order.push(["price", sort_order]);
//     } else {
//       throw { message: "Invalid sort order" };
//     }
//   }

//   const rooms = await db.room.findAll({
//     where: {
//       price: {
//         [Op.gte]: price_min,
//         [Op.lte]: price_max,
//       },
//       "$property.name$": { [Op.like]: `%${property_name}%` },
//     },
//     include: [
//       {
//         model: db.room_image,
//         as: "room_images",
//       },
//       {
//         model: property,
//         as: "property",
//       },
//     ],
//     order: order,
//     offset,
//     limit,
//     subQuery: false,
//   });

//   if (rooms.length === 0) {
//     return res.status(200).send({
//       isError: false,
//       message: "Cannot search the Room",
//       data: rooms,
//     });
//   }

//   const total_count = await db.room.count();
//   const total_pages = Math.ceil(total_count / page_size);

//   return res.status(200).json({
//     isError: false,
//     message: "Get room by query success",
//     data: rooms,
//     total_count,
//     total_pages,
//   });
// } catch (error) {
//   return res.status(400).json({
//     isError: true,
//     message: error.message,
//     data: null,
//   });
// }
// }


// const { sort_order, price_min = 300000, price_max = 99999999, page = 1,  } = req.query;
//       let page_size = 10;
//       const offset = (page - 1) * page_size;
//       const limit = page_size;
//       try {
//         let order = [];
  
//         if (sort_order) {
//           if (sort_order === "asc" || sort_order === "desc") {
//             order.push(["rooms", "price", sort_order]);
//           } else {
//             throw { message: "Invalid sort order" };
//           }
//         }
  
//         const properties = await property.findAll({
//           include: [
//             {
//               model: db.property_image,
//               as: "property_images",
//             },
//             {
//               model: db.room,
//               as: "rooms",
//               where: {
//                 price: {
//                   [Op.gte]: price_min,
//                   [Op.lte]: price_max,
//                 },
//               },
//               include: [
//                 {
//                   model: db.room_image,
//                   as: "room_images",
//                 },
//               ],
//             },
//             {
//               model: db.location,
//               as: "locations",
//               include: [
//                 {
//                   model: db.city,
//                   as: "city",
//                 },
//               ],
//             },
//           ],
//           order: order,
//           offset,
//           limit,
//         });
  
//         const total_count = await property.count(); // get total number of properties
//         const total_pages = Math.ceil(total_count / page_size); // calculate total number of pages
  
//         return res.status(200).send({
//           isError: false,
//           message: "Get data by type Success",
//           data: properties,
//           total_data: total_count,
//           total_pages,
//         });
//       } catch (error) {
//         return res.status(400).send({
//           isError: true,
//           message: error.message,
//           data: null,
//         });
//       }
