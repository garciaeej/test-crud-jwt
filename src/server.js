const dotenv = require("dotenv");
const express = require ("express");
const morgan = require ("morgan");
const cors = require ("cors");
const router = require ("./routes/user.routes.js")
const connectDB = require ("./db/connectDB.js");
const env = require("./config/config.services.js")
dotenv.config()

async function Server() {

    const port = env.PORT_SRV 
    const path = {
        users: '/users'
    }
   const app = express()

   //middleware
    app.use( morgan('dev'))
    app.use( express.json())
    app.use( express.urlencoded({ extended:true}))
    app.use( express.json())
    app.use( cors())

    //routes
    app.use(path.users,router)

    //db
    connectDB()

    //port
    app.listen( port)
    console.log('Server running on port',port);
}

module.exports =  Server
