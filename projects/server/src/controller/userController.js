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
                        message: 'Email or username already exist',
                        data: null
                    })
                }

                // make OTP generator
                let generateOTP = () =>{
                    const otp = Math.floor(100000 + Math.random() * 90000);
                    return otp;
                }
                const otp = generateOTP()
                const otp_created_at = new Date();

                // save the data into DB
                let createUsers = await users.create({
                    first_name, last_name, email, password: await hashPassword(password), phone_number, otp_code: otp, otp_created_at: otp_created_at}, {transaction: t})
                    console.log(createUsers)


                // make validation using email
                const template = await fs.readFile('./template/confirmation.html', 'utf-8');
                const templateCompile = await handlebars.compile(template);
                const newTemplate = templateCompile({first_name, url:`http://localhost:5000/activation/${createUsers.dataValues.id}`, otp})

                await transporter.sendMail({
                    from: 'Vcation',
                    to: email,
                    subject: 'Account Activation',
                    html: newTemplate
                })

                
                await t.commit()
                res.status(200).send({
                    isError: false,
                    message: 'Register Success',
                    data: null
                })

                
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
                const {otp, email} = req.body;
                const user = await users.findOne({email})

                if(!user){
                    res.status(400).send({
                        isError: true,
                        message: 'User Not Found',
                        data: null
                    })
                }

                if(user.otp !== otp){
                    res.status(400).send({
                        isError: true,
                        message: 'Invalid OTP',
                        data: null
                    })
                }

                
            } catch (error) {
                
            }
        }

       
}