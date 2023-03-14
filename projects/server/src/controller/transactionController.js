const { sequelize } = require("../sequelize/models");
const db = require("../sequelize/models");
const transactions = db.transactions;
const { Op, where } = require("sequelize");
const moment = require("moment");

// Import transporter formhandling email
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");

const fs = require("fs").promises;

module.exports = {
    transaction: async (req, res) => {
        const t = await sequelize.transaction();
        const { check_in, check_out, total_guest, room_id } = req.body;
        console.log(check_in)
        console.log(check_out)
        const id = req.dataToken.id;
    
        try {
          const room = await db.room.findByPk(room_id, {
            include: { model: db.property, include: db.location },
          },{ transaction: t });
    
          if (!room) {
            return res.status(404).send({
              isError: true,
              message: "Room Not Found",
              data: null,
            });
          }
    
          const bookings = await transactions.findAll({
            where: {
              room_id: room.id,
              check_in: { [Op.lt]: check_out },
              check_out: { [Op.gt]: check_in },
            },
          },{ transaction: t });
    
          let bookedRooms = bookings.length;
          const availableRooms = room.dataValues.available_room;
          const remainingRoom = availableRooms - bookedRooms;
    
          if (remainingRoom <= 0) {
            return res.status(400).send({
              isError: true,
              message: "No rooms available for the selected dates",
              data: null,
            });
          }
    
          const maxGuest = 2;
          const numberOfTransactions = Math.ceil(total_guest/ maxGuest);
          let transactionData = [];
    
          for (let i = 0; i < numberOfTransactions; i++) {
            const guestTransactions = (Math.min(total_guest - (i *  maxGuest), maxGuest))
            const transaction = await transactions.findAll({
              where: {
                room_id: room.id,
                check_in: { [Op.lt]: check_out },
                check_out: { [Op.gt]: check_in },
              },
            },{ transaction: t });
            
            if (bookedRooms >= availableRooms) {
                return res.status(404).send({
                  isError: true,
                  message: "Another booking already exists for the selected dates",
                  data: null,
                });
              }

            if(numberOfTransactions > availableRooms){
                return res.status(404).send({
                    isError: true,
                    message: "Max guest is exceeded",
                    data: null
                })
            }

    
            const order_id =
              moment().format("YYYYMMDDHHmmss") + Math.floor(Math.random() * 10000);
    
            const price =
              moment(check_out).diff(moment(check_in), "days") *
              room.dataValues.price;
            
              console.log(room.dataValues.price)
    
            const _transaction = await transactions.create({
              users_id: id,
              room_id,
              check_in,
              check_out,
              total_guest: guestTransactions,
              total_price: price,
              status_id: 4,
              order_id: order_id,
              expired: moment().add(2, "hours").toDate(),
            },
            { transaction: t });
    
            transactionData.push(_transaction);
    
            await db.transactions_history.create({
              transactions_id: _transaction.id,
            }, { transaction: t });
    
            const isTransactionExpired = (_transaction) => {
              const expiredTime = new Date(_transaction.expired).getTime();
              const currentTime = new Date().getTime();
              return expiredTime < currentTime;
            };
            const isExpired = isTransactionExpired(_transaction);
    
            transactionData.push({
              transaction: _transaction,
              isExpired,
            });
            bookedRooms++;
          }
          await t.commit();
          if (transactionData.length > 0) {
            return res.status(200).json({
              isError: false,
              message: "Booked Room success, waiting for payment",
              data: transactionData,
            });
          }
        } catch (error) {
        await t.rollback();
          return res.status(400).send({
            isError: true,
            message: error.message,
            data: error,
          });
        }
      },
    

  event: async (req, res) => {
    const { room_id } = req.query;

    try {
      const event = await db.event.findAll({
        where: { room_id },
        include: {
          model: db.event_rates,
        },
      });
      if (!event) {
        return res.status(400).send({
          isError: true,
          message: "There is No event available for now",
          data: null,
        });
      }

      return res.status(200).send({
        isError: false,
        message: "Get Event",
        data: event,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  dataTransaction: async(req, res) => {
    try {
      const {room_id, order_id1, order_id2} = req.body
      const id = req.dataToken.id;
      console.log(id)
      const transaction = await transactions.findAll({
        where: {
          room_id: room_id,
          [Op.or]: [
            {order_id: order_id1},
            {order_id: order_id2} 
          ]
        },
          include: [
            {
              model: db.room,
              where: {id: room_id},
              include: [
                {model: db.room_image},
                {model: db.property}
              ]

            },
            {
              model: db.users,
              where: {id: id}
            }
          ]
        })

        console.log(transaction)

      return res.status(200).send({
        isError: false,
        message: "Success",
        data: transaction
      })
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null
      })
    }
  },

  paymentProof: async (req, res) => {
    const {room_id, order_id1, order_id2 } = req.body;
    const t = await sequelize.transaction()
    try {
      const data = await transactions.findAll({
        where: {
          room_id: room_id,
          [Op.or]: [
            {order_id: order_id1},
            {order_id: order_id2} 
          ]
        },
      }, {transaction: t});

      console.log(req.files)
      await transactions.update(
        {
          image_path: req.files.images[0].path,
          status_id: 7
        },
        {where: {[Op.or]: [
          {order_id: order_id1},
          {order_id: order_id2}
        ]}}, {transaction : t})

      t.commit()
      return res.status(200).send({
        isError: false,
        message: "Upload success, waiting for tenant approval",
        data: data
      })
    } catch (error) {
      t.rollback()
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null
      })
    }
  },
};
