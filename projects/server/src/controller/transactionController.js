const { sequelize } = require("../sequelize/models");
const db = require("../sequelize/models/index.js");
const transactions = db.transactions
const { Op } = require("sequelize");
const moment = require("moment")

// Import transporter formhandling email
const transporter = require("../helpers/transporter")
const handlebars = require("handlebars")

const fs = require("fs").promises;

module.exports = {
    transaction: async(req, res) => {
        const {check_in, check_out, total_guest, room_id} = req.body;

        const id = req.dataToken.id
        console.log(id)
        try {
            const room = await db.room.findByPk(room_id, {
                include: {model: db.property, include: db.location}
            })
            console.log(room)

            if(!room){
                return res.status(404).send({
                    isError: true,
                    message: "Room Not Found",
                    data: null
                })
            }

            const transaction = await transactions.findAll({
                where: {
                    room_id: room.id,
                    check_in: 
                    {[Op.lt]: check_out},
                    check_out: {[Op.gt]: check_in}
                }
            });

            if(transaction.length > 0){
                return res.status(404).send({
                    isError: true,
                    message: "Room is not available for the selected dates",
                    data: null
                })
            }

            const order_id = moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 10000)


            const price = moment(check_out).diff(moment(check_in), "days") * room.dataValues.price

            console.log(room.dataValues.price)


            const _transaction = await transactions.create({
                users_id: id,
                room_id,
                check_in,
                check_out,
                total_guest,
                total_price: price,
                status_id: 4,
                order_id: order_id,
                expired: moment().add(2, 'hours').toDate(),
            })


            await db.transactions_history.create({
                transactions_id: _transaction.id,
            })

            const isTransactionExpired = (_transaction) => {
                const expiredTime = new Date(_transaction.expired).getTime();
                const currentTime = new Date().getTime()
                return expiredTime < currentTime
            }

            const isExpired = isTransactionExpired(_transaction)

            return res.status(200).json({
                isError: false,
                message: "Booked Room success, waiting for payment",
                data: {
                    _transaction,
                    isExpired
                }
            })
            
        } catch (error) {
            return res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
            
        }
    },

    paymentProof: async(req, res) => {
        try {
            const transaction = await transactions.findOne({
                where: {
                    id: transactions_id
                }
            })
        } catch (error) {
            
        }
    }
};