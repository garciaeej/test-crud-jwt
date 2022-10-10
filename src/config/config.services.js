const dotenv = require('dotenv').config()

     const env = {

        PORT_SRV: process.env.PORT_SRV,
        JWT_KEY: process.env.JWT_KEY
    }

module.exports = env