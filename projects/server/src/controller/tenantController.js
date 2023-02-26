const { sequelize } = require("../sequelize/models");
const db = require("../sequelize/models/index.js");
const tenant = db.tenant;

const { Op } = require("sequelize");

// impoort hashing
const { hashPassword, hashMatch } = require("./../lib/hashPassword");

// import webToken
const { createToken } = require("./../lib/webToken");

// import transporter
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");

const HttpResponse = require("../helpers/httpResponse");

const fs = require("fs").promises;

module.exports = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      let { first_name, last_name, email, password, phone_number } = req.body;

      // input Validation if its not have a length
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

        return httpResponse.send();
      }

      let findEmail = await tenant.findOne(
        { where: { email } },
        { transaction: t }
      );

      if (findEmail) {
        const httpResponse = new HttpResponse(res).error(
          "Email already exist",
          400
        );

        return httpResponse.send();
      }

      // OTP GENERATOR
      const otp = Math.floor(10000 + Math.random() * 9000);

      // saving data to DB
      let createTenant = await tenant.create(
        {
          first_name,
          last_name,
          email,
          password: await hashPassword(password),
          phone_number,
          otp_code: otp,
          otp_created_at: new Date(),
          ktp_path: req.files.ktp_path[0].path, // get file data from req.file object
        },
        { transaction: t }
      );

      const template = await fs.readFile(
        "./template/confirmation.html",
        "utf-8"
      );
      const templateCompile = await handlebars.compile(template);
      const newTemplate = templateCompile({
        first_name,
        url: `http://localhost:3000/activation/${createTenant.dataValues.id}`,
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
        message: error.message,
        data: null,
      });
    }
  },

  activation: async (req, res) => {
    try {
      const { id, otp } = req.body;

      const findTenant = await tenant.findOne({
        where: {
          id: id,
        },
      });

      if (!findTenant) {
        const httpResponse = new HttpResponse(res).error(
          "Tenant Not Found",
          400
        );

        return httpResponse.send();
      }

      if (findTenant.status !== "unconfirmed") {
        const httpResponse = new HttpResponse(res).error(
          "Tenant has already been confirmed",
          400
        );

        return httpResponse.send();
      }

      if (!otp) {
        const httpResponse = new HttpResponse(res).error(
          "Field Cannot Blank",
          400
        );

        return httpResponse.send();
      }

      if (parseInt(findTenant.dataValues.otp_code) !== parseInt(otp)) {
        const httpResponse = new HttpResponse(res).error("Invalid OTP", 400);

        return httpResponse.send();
      }

      const otp_created_at = new Date(findTenant.otp_created_at);
      const now = new Date();
      const diffInMs = now - otp_created_at;
      const diffInDays = diffInMs / (24 * 60 * 60 * 1000);

      console.log("tes");
      if (diffInDays > 1) {
        const httpResponse = new HttpResponse(res).error(
          "OTP has expired",
          400
        );

        return httpResponse.send();
      }

      findTenant.status = "confirmed";
      console.log(findTenant);
      await findTenant.save();
      if ((findTenant.status = "confirmed")) {
        return res.status(200).send({
          isError: false,
          message: "Tenant Validate Success",
          data: null,
        });
      }

      return findTenant;
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
      const tenants = await tenant.findOne({ where: { id: req.params.id } });
      if (!tenants) {
        return res.status(404).send({
          isError: true,
          message: "Tenant Not Found",
          data: null,
        });
      }

      const otp = Math.floor(10000 + Math.random() * 9000);
      tenants.otp_code = otp;
      tenants.otp_created_at = new Date();

      await tenants.save();

      const first_name = tenants.dataValues.first_name;
      const email = tenants.dataValues.email;

      const template = await fs.readFile(
        "./template/confirmation.html",
        "utf-8"
      );
      const templateCompile = await handlebars.compile(template);
      const newTemplate = templateCompile({
        first_name,
        url: `http://localhost:3000/activation/${tenants.dataValues.id}`,
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
      let findEmailAndPhoneNumber = await tenant.findOne({
        where: {
          [Op.or]: [{ email: emailOrPhone }, { phone_number: emailOrPhone }],
        },
      });

      if (!emailOrPhone || !password.length) {
        const httpResponse = new HttpResponse(res).error(
          "Field Cannot Blank",
          400
        );

        return httpResponse.send();
      }

      if (!findEmailAndPhoneNumber) {
        const httpResponse = new HttpResponse(res).error(
          "Account not found",
          400
        );

        return httpResponse.send();
      }

      if (findEmailAndPhoneNumber.dataValues.status === "unconfirmed") {
        const httpResponse = new HttpResponse(res).error(
          "Your email not Active",
          400
        );

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