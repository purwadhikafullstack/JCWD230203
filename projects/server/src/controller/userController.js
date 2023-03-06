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
const deleteFiles = require('./../helpers/deleteFiles')

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
        return res.status(400).send({
          isError: true,
          message: "Field cannot blank!",
          data: null
        })
      }

      if(!email.includes("@") || email.length < 10 ){
        return res.status(400).send({
          isError: true,
          message: "email must contain @ and contain at least 10 char",
          data: null
        })
      }


      if(phone_number.length < 9){
        return res.status(400).send({
          isError: true, 
          message: "Phone Number not Valid",
          data: null
        })
      }

      let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
      if(!regex.test(password)){
        return res.status(400).send({
          isError: true,
          message: "Password must contains letter and any number",
          data: null
        })
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
        return res.status(400).send({
          isError: true,
          message: "Email or Phone already Exist!",
          data: null
        })
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
        message: error.message,
        data: error,
      });
    }
  },

  activation: async (req, res) => {
    try {
      const { id, otp } = req.body;


      const findUser = await users.findOne({
        where: {
          id: id,
        },
      });

      if (!findUser) {
        return res.status(400).send({
          isError: true,
          message: "User Not Found!",
          data: null
        })
      }

      if (findUser.status !== "unconfirmed") {
        return res.status(400).send({
          isError: true,
          message: "user has already been confirmed!",
          data: null
        })
      }

      if (!otp) {
        return res.status(400).send({
          isError: true,
          message: "Field cannot blank!",
          data: null
        })
      }

      if (parseInt(findUser.dataValues.otp_code) !== parseInt(otp)) {
        return res.status(400).send({
          isError: true,
          message: "Invalid OTP!",
          data: null
        })
      }

      const otp_created_at = new Date(findUser.otp_created_at);
      const now = new Date();
      const diffInMs = now - otp_created_at;
      const diffInDays = diffInMs / (24 * 60 * 60 * 1000);

      console.log("tes");
      if (diffInDays > 1) {
        return res.status(400).send({
          isError: true,
          message: "OTP has expired",
          data: null
        })
      }

      findUser.status = "confirmed";
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
        data: error,
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
        data: error,
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
        return res.status(400).send({
          isError: true,
          message: "Field cannot blank!",
          data: null
        })
      }

      if (!findEmailAndPhoneNumber) {
        return res.status(400).send({
          isError: true,
          message: "Account Not Found !",
          data: null
        })
      }

      if (findEmailAndPhoneNumber.dataValues.status === "unconfirmed") {
        return res.status(400).send({
          isError: true,
          message: "Your Email Not Active",
          data: null
        })
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

      return res.status(200).send({
        isError: false,
        message: "Login Success",
        data: {
          findEmailAndPhoneNumber,
          token: createToken({ id: findEmailAndPhoneNumber.dataValues.id }),
        },
      });

    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: error,
      });
    }
  },

  keepLogin: async(req, res) => {

    let getName = await users.findOne({
      where: {
        id: req.dataToken.id
      }
    })


    return res.status(201).send({
      isError: false,
      message: "Token Valid",
      data: 
      {
        first_name: getName.dataValues.first_name,
        last_name: getName.dataValues.last_name,
        role: getName.dataValues.role,
      }
      
    });
  },

  getUser: async(req,res) => {
    console.log(req.dataToken.id)
    console.log("masuk sini")

    try {
      let user = await users.findOne({
				where: { id: req.dataToken.id },
				include: { model: db.users_details },
			});

      return res.status(201).send({
        isError: false,
        message: "Get user Success",
        data: user
        
      })
      
    } catch (error) {
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: error,
      });
    }
  },

  updateUser: async(req, res) => {
    const {first_name, last_name, email, gender, phone_number, address, birth_date } = req.body 
    console.log(req.body)
    const t = await sequelize.transaction();
    try {

      const match = await users.findOne({
        where: { phone_number },
      });

      if(match){
        return res.status(400).send({
          isError: true,
          message: "Phone number already in used",
          data: null
        })
      }


       await db.users.update(
         {first_name, last_name, email, phone_number},
         {where: {id: req.dataToken.id}, transaction: t}
       )

       await db.users_details.update(
        {gender, address, birth_date},
        {where: {users_id: req.dataToken.id}, transaction: t}
      )


      await t.commit();

       return res.status(200).send({
         isError: false,
         message: "Update Success",
         data: {}
       })


    } catch (error) {
      await t.rollback();
        return res.status(404).send({
          isError: true,
          message: error.message,
          data: error
        })
    }
  },

  editProfilePict: async(req, res) => {
    let id = req.dataToken.id


    try {
        let img = await db.users.findOne({
          where: {id},
          include: [
            {model: db.users_details,}
          ]
        })


        console.log(req.files)
        await db.users_details.update(
          {
          picture_path: req.files.images[0].path
          },
          {
            where: {users_id: id}
          }
        );


        return res.status(201).send({
          isError: false,
          message: "Success Updating Profile Picture",
          data: img
        })
    } catch (error) {
      deleteFiles(req.files)
      return res.status(400).send({
        isError: true,
        message: error.message,
        error: error
      })
    }
  }
};
