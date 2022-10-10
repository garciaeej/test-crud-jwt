const{ connect} = require("mongoose");

async function connectDB(){

    try {
        /// docker port
        await connect('mongodb://localhost:27020/mit-crud-jwt',{
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        console.log("Database connected")
        
    } catch (error) {
        console.error(error);        
    }

}

module.exports = connectDB
