const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.TP_USER, //email sender
        pass: process.env.TP_PASS // key generate by google email
    },
    tis: {
        rejectUnauthorized: false
    }
})

module.exports = transporter
