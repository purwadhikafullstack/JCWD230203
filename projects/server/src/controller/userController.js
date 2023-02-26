const { sequelize } = require("../sequelize/models");
const db = require("../sequelize/models/index.js");
const users = db.users;
const { Op } = require("sequelize");

// Generate UID
const { v4: uuidv4 } = require("uuid");

// impoort hashing
const { hashPassword, hashMatch } = require("./../lib/hashPassword");

// import webToken
const { createToken } = require("./../lib/webToken");

// import transporter
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");

// import HttpResponse
const HttpResponse = require("../helpers/httpResponse");

const fs = require("fs").promises;

module.exports = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      let { first_name, last_name, email, password, phone_number } = req.body;
      console.log(req.body);

      // input validation if its not have a length
      if (
        !first_name.length ||
        !email.length ||
        !password.length ||
        !phone_number.length
      ) {
        const httpResponse = new HttpResponse(res).error(
          "Field cannot blank!",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      // Checking the input into DB based on email and phone number
      let findEmailAndPhoneNumber = await users.findOne(
        {
          where: {
            [Op.or]: [{ email: email }, { phone_number: phone_number }],
          },
        },
        { transaction: t }
      );

      if (findEmailAndPhoneNumber) {
        const httpResponse = new HttpResponse(res).error(
          "Email or phone number already exist",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      // make OTP generator
      const otp = Math.floor(10000 + Math.random() * 9000);

      // save the data into DB
      let createUsers = await users.create(
        {
          first_name,
          last_name,
          email,
          password: await hashPassword(password),
          phone_number,
          otp_code: otp,
          otp_created_at: new Date(),
        },
        { transaction: t }
      );

      // make validation using email
      const template = await fs.readFile(
        "./template/confirmation.html",
        "utf-8"
      );
      const templateCompile = await handlebars.compile(template);
      const newTemplate = templateCompile({
        first_name,
        url: `http://localhost:3000/activation/${createUsers.dataValues.id}`,
        otp,
      });

      await transporter.sendMail({
        from: "Vcation",
        to: email,
        subject: "Account Activation",
        html: newTemplate,
      });

      await t.commit();

      return res.status(200).send({
        isError: false,
        message: "Register Success",
        data: null,
      });
    } catch (error) {
      await t.rollback();
      return res.status(404).send({
        isError: true,
        message: error,
        data: null,
      });
    }
  },

  activation: async (req, res) => {
    try {
      const { id, otp } = req.body;
      console.log(otp);
      console.log(id);

      const findUser = await users.findOne({
        where: {
          id: id,
        },
      });

      if (!findUser) {
        const httpResponse = new HttpResponse(res).error(
          "User Not Found!",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      if (findUser.status !== "unconfirmed") {
        const httpResponse = new HttpResponse(res).error(
          "User has already been confirmed",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      if (!otp) {
        const httpResponse = new HttpResponse(res).error(
          "Field Cannot Blank",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      if (parseInt(findUser.dataValues.otp_code) !== parseInt(otp)) {
        const httpResponse = new HttpResponse(res).error("Invalid OTP", 400);
        console.log(httpResponse);

        return httpResponse.send();
      }

      const otp_created_at = new Date(findUser.otp_created_at);
      const now = new Date();
      const diffInMs = now - otp_created_at;
      const diffInDays = diffInMs / (24 * 60 * 60 * 1000);

      console.log("tes");
      if (diffInDays > 1) {
        const httpResponse = new HttpResponse(res).error(
          "OTP has expired",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      findUser.status = "confirmed";
      console.log(findUser);
      await findUser.save();
      if ((findUser.status = "confirmed")) {
        return res.status(200).send({
          isError: false,
          message: "User Validate Success",
          data: null,
        });
      }

      return findUser;
    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  resendOtp: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const user = await users.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).send({
          isError: true,
          message: "User Not Found",
          data: null,
        });
      }

      const otp = Math.floor(10000 + Math.random() * 9000);
      user.otp_code = otp;
      user.otp_created_at = new Date();
      console.log(user);
      await user.save();
      const first_name = user.dataValues.first_name;
      const email = user.dataValues.email;

      const template = await fs.readFile(
        "./template/confirmation.html",
        "utf-8"
      );
      const templateCompile = await handlebars.compile(template);
      const newTemplate = templateCompile({
        first_name,
        url: `http://localhost:3000/activation/${user.dataValues.id}`,
        otp,
      });

      await transporter.sendMail({
        from: "Vcation",
        to: email,
        subject: "Account Activation",
        html: newTemplate,
      });

      t.commit();

      return res.status(200).send({
        isError: false,
        message: "OTP code sent successfully",
        data: null,
      });
    } catch (error) {
      t.rollback();
      return res.status(400).send({
        isError: false,
        message: error.message,
        data: null,
      });
    }
  },

  Login: async (req, res) => {
    let { emailOrPhone, password } = req.body;

    try {
      let findEmailAndPhoneNumber = await users.findOne({
        where: {
          [Op.or]: [{ email: emailOrPhone }, { phone_number: emailOrPhone }],
        },
      });

      if (!emailOrPhone || !password.length) {
        const httpResponse = new HttpResponse(res).error(
          "Field Cannot Blank",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      if (!findEmailAndPhoneNumber) {
        const httpResponse = new HttpResponse(res).error(
          "Account not found",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      if (findEmailAndPhoneNumber.dataValues.status === "unconfirmed") {
        const httpResponse = new HttpResponse(res).error(
          "Your email not Active",
          400
        );
        console.log(httpResponse);

        return httpResponse.send();
      }

      let matchPassword = await hashMatch(
        password,
        findEmailAndPhoneNumber.dataValues.password
      );

      if (!matchPassword) {
        return res.status(404).send({
          isError: true,
          message: "Password is Wrong",
          data: null,
        });
      }

      res.status(201).send({
        isError: false,
        message: "Login Success",
        data: {
          findEmailAndPhoneNumber,
          token: createToken({ id: findEmailAndPhoneNumber.dataValues.id }),
        },
      });
    } catch (error) {
      res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },

  keepLogin: (req, res) => {
    res.status(201).send({
      isError: false,
      message: "Token Valid",
      data: req.headers.auth,
    });
  },
};