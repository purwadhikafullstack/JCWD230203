const {sequelize} = require('../sequelize/models')
const db = require('../sequelize/models/index.js')
const users = db.users
const {Op} = require('sequelize')

// Generate UID
const { v4: uuidv4 } = require('uuid')

// impoort hashing
const {hashPassword,hashMatch} = require('./../lib/hashPassword')

// import webToken
const {webToken, createToken} = require('./../lib/webToken');

// import transporter
const transporter  = require('../helpers/transporter');
const handlebars = require('handlebars')

const fs = require('fs').promises;

module.exports = {
    register: async(req,res) => {
        const t = await sequelize.transaction()
        try {

            let {first_name, last_name , email,  password, phone_number} = req.body 
            console.log(req.body)

            // input validation if its not have a length
            if(!first_name.length || !email.length || !password.length || !phone_number.length)
            return res.status(400).send({
                    isError: true,
                    message: 'Data Not Found!',
                    data: null
            })

            // Checking the input into DB based on email and phone number
            let findEmailAndPhoneNumber = await users.findOne({
                where: {
                    [Op.and]: [
                        {email: email},
                        {phone_number: phone_number}
                    ]
                }
            }, {transaction: t})

            if(findEmailAndPhoneNumber){
                return res.status(404).send({
                    isError: true,
                    message: 'Email or phone number already exist',
                    data: null
                })
            }

            // make OTP generator
            const otp = Math.floor(10000 + Math.random() * 9000);

            // save the data into DB
            let createUsers = await users.create({
                first_name,
                last_name,
                email,
                password: await hashPassword(password),
                phone_number,
                otp_code: otp,
                otp_created_at: new Date()
                }, { transaction: t })

            const queryParams = new URLSearchParams({
                email: email,
                otp: otp,
                user_id: createUsers.dataValues.id, // Add the user ID to the query parameters
            });
          
            const redirectUrl = `http://localhost:3000/activation?${queryParams.toString()}`;

            // make validation using email
            const template = await fs.readFile('./template/confirmation.html', 'utf-8');
            const templateCompile = await handlebars.compile(template);
            const newTemplate = templateCompile({first_name, url:`http://localhost:3000/activation/${createUsers.dataValues.id}`, otp});

            await transporter.sendMail({
                from: 'Vcation',
                to: email,
                subject: 'Account Activation',
                html: newTemplate
            })
            

            res.status(200).send({
                isError: false,
                message: 'Register Success',
                data: redirectUrl
            })

            await t.commit()

        } catch (error) {
            await t.rollback()
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            },)
        }
    },

        activation: async(req, res) => {
            try {

                const {otp} = req.body;
                console.log(users)

                const findUser = await users.findOne({
                    where: {
                        id: req.params.id
                    }
                })


                if(!findUser){
                    res.status(400).send({
                        isError: true,
                        message: 'User Not Found',
                        data: null
                    })
                }

                if(findUser.status !== "unconfirmed"){
                    res.status(400).send({
                        isError: true,
                        message: 'User has already been confirmed',
                        data: null
                    })
                }
                
            
                if(findUser.otp_code !== otp){
                    res.status(400).send({
                        isError: true,
                        message: 'Invalid OTP',
                        data: null
                    })
                }

                const otp_created_at = new Date(findUser.otp_created_at);
                const now = new Date();
                const diffInMs = now - otp_created_at;
                const diffInDays = diffInMs / (24 * 60 * 60 * 1000);
            

                if(diffInDays > 1){
                    res.status(400).send({
                        isError: true,
                        message: 'OTP has expired',
                        data: null
                    })
                }
                
                findUser.status = "confirmed";
                await findUser.save();
                if(findUser.status = "confirmed"){
                    res.status(200).send({
                        isError: false,
                        message: 'User Validate Success',
                        data: null
                    })
                }
                
                return findUser;
                
            } catch (error) {
                res.status(404).send({
                    isError: true,
                    message: error.message,
                    data: null
                })
            }
        }

       
}