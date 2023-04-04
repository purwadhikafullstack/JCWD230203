const webToken = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    createToken: (payload) => {
        return webToken.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        })
    },

    validateToken: (token) => {
        return webToken.verify(token,  process.env.JWT_KEY)
    }
}