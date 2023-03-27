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
    const id = req.dataToken.id;

    try {
      const user = await db.users.findOne({
        where: { id },
      });

      if (user.dataValues.status === "unconfirmed") {
        return res.status(400).send({
          isError: true,
          message: "Your Account is Not Active",
          data: null,
        });
      }

      const room = await db.room.findByPk(
        room_id,
        {
          include: { model: db.property, include: db.location },
        },
        { transaction: t }
      );

      if (!room) {
        return res.status(404).send({
          isError: true,
          message: "Room Not Found",
          data: null,
        });
      }

      const bookings = await transactions.findAll(
        {
          where: {
            room_id: room.id,
            check_in: { [Op.lt]: check_out },
            check_out: { [Op.gt]: check_in },
          },
        },
        { transaction: t }
      );

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
      const numberOfTransactions = Math.ceil(total_guest / maxGuest);
      let transactionData = [];

      for (let i = 0; i < numberOfTransactions; i++) {
        const guestTransactions = Math.min(
          total_guest - i * maxGuest,
          maxGuest
        );

        const transaction = await transactions.findAll(
          {
            where: {
              room_id: room.id,
              check_in: { [Op.lt]: check_out },
              check_out: { [Op.gt]: check_in },
            },
          },
          { transaction: t }
        );

        if (bookedRooms >= availableRooms) {
          return res.status(404).send({
            isError: true,
            message: "Another booking already exists for the selected dates",
            data: null,
          });
        }

        if (numberOfTransactions > availableRooms) {
          return res.status(404).send({
            isError: true,
            message: "Max guest is exceeded",
            data: null,
          });
        }

        const order_id =
          moment().format("YYYYMMDDHH") + Math.floor(Math.random() * 10000);

        const price =
          moment(check_out).diff(moment(check_in), "days") *
          room.dataValues.price;

        const _transaction = await transactions.create(
          {
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
          { transaction: t }
        );

        transactionData.push(_transaction);

        await db.transactions_history.create(
          {
            transactions_id: _transaction.id,
          },
          { transaction: t }
        );

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

  dataTransaction: async (req, res) => {
    try {
      const { room_id, order_id1, order_id2 } = req.body;
      const final_order2 = order_id2 || null;
      const id = req.dataToken.id;
      const transaction = await transactions.findAll({
        where: {
          room_id: room_id,
          [Op.or]: [
            { order_id: order_id1 },
            { order_id: { [Op.eq]: final_order2 } },
          ],
        },
        include: [
          {
            model: db.room,
            where: { id: room_id },
            include: [{ model: db.room_image }, { model: db.property }],
          },
          {
            model: db.users,
            where: { id: id },
          },
        ],
      });

      return res.status(200).send({
        isError: false,
        message: "Success",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  tenantDataTransaction: async (req, res) => {
    try {
      const { users_id, room_id, order_id1, order_id2 } = req.body;
      const final_order2 = order_id2 || null;
      const id = users_id;
      const transaction = await transactions.findAll({
        where: {
          room_id: room_id,
          [Op.or]: [
            { order_id: order_id1 },
            { order_id: { [Op.eq]: final_order2 } },
          ],
        },
        include: [
          {
            model: db.room,
            where: { id: room_id },
            include: [{ model: db.room_image }, { model: db.property }],
          },
          {
            model: db.users,
            where: { id: id },
          },
        ],
      });

      return res.status(200).send({
        isError: false,
        message: "Success",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  paymentProof: async (req, res) => {
    const { room_id, order_id1, order_id2 } = req.body;
    const final_order2 = order_id2 || null;
    const t = await sequelize.transaction();
    try {
      const data = await transactions.findAll(
        {
          where: {
            room_id: room_id,
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );
      await transactions.update(
        {
          image_path: req.files.images[0].path,
          status_id: 7,
        },
        {
          where: {
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );

      t.commit();
      return res.status(200).send({
        isError: false,
        message: "Upload success, waiting for tenant approval",
        data: data,
      });
    } catch (error) {
      t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  orderList: async (req, res) => {
    const id = req.dataToken.id;
    const {
      page = 1,
      status_id,
      start_date,
      end_date,
      order_id,
      sort_by = "order_id",
    } = req.query;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      const where = { users_id: id };
      if (start_date && end_date) {
        where.check_in = { [Op.between]: [start_date, end_date] };
      }
      if (status_id) {
        where.status_id = status_id;
      }
      if (order_id) {
        where.order_id = order_id;
      }

      // order clause by sort params
      let order = [["order_id", "DESC"]];
      if (sort_by === "start_Date") {
        order = [["createdAt", "ASC"]];
      } else if (sort_by === "end_date") {
        order = [["createdAt", "DESC"]];
      }

      const transaction = await transactions.findAll({
        where,
        include: [
          {
            model: db.users,
            include: { model: db.users_details },
          },
          {
            model: db.room,
            include: [
              { model: db.room_image },
              { model: db.property, include: { model: db.property_image } },
            ],
          },
        ],
        offset,
        limit,
        order,
      });

      const total_count = await transactions.count({ where });
      const total_pages = Math.ceil(total_count / page_size);

      return res.status(200).send({
        isError: false,
        message: "Get Order List By Status",
        data: transaction,
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

  cancelOrder: async (req, res) => {
    const { room_id, order_id1, order_id2 } = req.body;
    const final_order2 = order_id2 || null;
    const t = await sequelize.transaction();
    try {
      const data = await transactions.findAll(
        {
          where: {
            room_id: room_id,
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );

      await transactions.update(
        { status_id: 3 },
        {
          where: {
            room_id: room_id,
            [Op.or]: [
              { order_id: order_id1 },
              { order_id: { [Op.eq]: final_order2 } },
            ],
          },
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Cancel Order Success",
        data: data,
      });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  allOrderList: async (req, res) => {
    const id = req.dataToken.id;
    const page = 1;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      const transaction = await transactions.findAll({
        where: { users_id: id },
        include: {
          model: db.room,
          include: [
            { model: db.room_image },
            { model: db.property, include: { model: db.property_image } },
          ],
        },
        offset,
        limit,
      });

      const total_count = await transactions.count({
        where: { users_id: id },
      });
      return res.status(200).send({
        isError: false,
        message: "Get all Order List",
        data: transaction,
        count: total_count,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getAllStatus: async (req, res) => {
    try {
      const status = await db.status.findAll({
        where: { id: [2, 3, 4, 7, 8] },
      });

      return res.status(200).send({
        isError: false,
        message: "Get Status",
        data: status,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  getOrderListFilter: async (req, res) => {
    const id = req.dataToken.id;
    const {
      start_date,
      end_date,
      status_id,
      order_id,
      sort_by = "order_id",
      page = 1,
    } = req.query;
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;

    try {
      // define where clause for the filters
      const where = { users_id: id };
      if (start_date && end_date) {
        where.check_in = { [Op.between]: [start_date, end_date] };
      }
      if (status_id) {
        where.status_id = status_id;
      }
      if (order_id) {
        where.order_id = order_id;
      }

      // order clause by sort params
      let order = [["order_id", "DESC"]];
      if (sort_by === "start_Date") {
        order = [["createdAt", "ASC"]];
      } else if (sort_by === "end_date") {
        order = [["createdAt", "DESC"]];
      }

      const transaction = await transactions.findAll({
        where,
        include: [
          {
            model: db.users,
            include: { model: db.users_details },
          },
          {
            model: db.room,
            include: [
              { model: db.room_image },
              { model: db.property, include: { model: db.property_image } },
            ],
          },
        ],
        offset,
        limit,
        order,
      });

      const total_count = await transactions.count({ where });

      return res.status(200).send({
        isError: false,
        message: "Get all Order List",
        data: transaction,
        count: total_count,
      });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  tenantOrderList: async (req, res) => {
    const id = req.dataToken.id;
    const { page = 1, status_id, room_id } = req.body;
    console.log(req.body)
    const page_size = 5;
    const offset = (page - 1) * page_size;
    const limit = page_size;
    try {
      // because the transactions doest record the tenant id, we should track the tenant id based on their relations

      // first get the property which it available in transactions db
      const properties = await db.property.findAll({
        where: { tenant_id: id },
        include: [
          {
            model: db.room,
            include: [
              { model: db.property },
              { model: db.room_image },
              {
                model: transactions,
                where: status_id ? { status_id } : {},
                include: [
                  {
                    model: db.users,
                    include: { model: db.users_details },
                  },
                ],
              },
            ],
          },
        ],
        offset,
        limit,
      });

      // initialize an empty array to hold the transactions
      let transaction = [];



      properties.forEach((property) => {
        if (property.rooms) {
          property.rooms.forEach((room) => {
            if (room.transactions) {
              transaction = transaction.concat(room.transactions.map((transaction) => {
                return {
                  property: property.dataValues,
                  room: room.dataValues,
                  transaction: transaction.dataValues,
                };
              }));
            }
          });
        }
      });

      const total_data = transaction.length;
      const total_pages = Math.ceil(total_data / page_size);

      // Filter transactions by room_id if provided
      if (room_id) {
        transaction = transactions.filter(
          (transaction) => transaction.room_id === room_id
        );
      }


      transaction = transaction.slice(offset, limit);

    return res.status(200).send({
      isError: false,
      message: "Get Tenant Order List By Status",
      data: transaction,
      total_data: total_data,
      total_pages: total_pages,
     });
    } catch (error) {
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  acceptRejectOrder: async (req, res) => {
    const { users_id, room_id, order_id1, order_id2, respond } = req.body;
    const final_order2 = order_id2 || null;
    const id = users_id;
    console.log(req.body);
    const t = await sequelize.transaction();
    try {
      const transaction = await transactions.findOne({
        where: {
          room_id,
          [Op.or]: [
            { order_id: order_id1 },
            { order_id: { [Op.eq]: final_order2 } },
          ],
        },
        include: [{ model: db.users, where: { id } }],
      });

      if (respond === "Accept") {
        await transactions.update(
          { status_id: 2 },
          {
            where: {
              room_id,
              [Op.or]: [
                { order_id: order_id1 },
                { order_id: { [Op.eq]: final_order2 } },
              ],
            },
          },
          { transaction: t }
        );

        await db.transactions_history.update(
          { status_id: 2 },
          { where: { transactions_id: transaction.dataValues.id } },
          { transaction: t }
        );

        const template = await fs.readFile("./template/rules.html", "utf-8");

        const templateCompile = await handlebars.compile(template);

        await transporter.sendMail({
          from: "Vcation",
          to: email,
          subject: "Rules and Room Details",
          html: templateCompile,
        });

        return res.status(200).send({
          isError: false,
          message: "Payment Accpeted",
          data: transaction,
        });
      }

      if (respond === "Reject") {
        await transactions.update(
          { status_id: 8 },
          {
            where: {
              room_id,
              [Op.or]: [
                { order_id: order_id1 },
                { order_id: { [Op.eq]: final_order2 } },
              ],
            },
          },
          { transaction: t }
        );

        await db.transactions_history.update(
          { status_id: 8 },
          { where: { transactions_id: transaction.dataValues.id } },
          { transaction: t }
        );

        return res.status(200).send({
          isError: false,
          message: "Payment Rejected",
          data: transaction,
        });
      }

      await t.commit();
      return res.status(200).send({
        isError: false,
        message: "Success",
        data: transaction,
      });
    } catch (error) {
      await t.rollback();
      return res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },
};
