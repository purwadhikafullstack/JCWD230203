const webToken = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    createToken: (payload) => {
        return webToken.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        })
    },

    validateToken: (token) => {
        return webToken.verify(token,  process.env.SECRET)
    }
}