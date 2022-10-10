const { Schema, model } = require("mongoose");
/////// modulo sin usar
const bcrypt = require("bcrypt");
//////
const mongoosePaginate =require("mongoose-paginate-v2")


const userSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        index: true,
        unique:true
    },
    password: {
        type: String,
        index: true,
        unique:true
    },
    /// timestamps posee la propiedad createdAt para la creacion del documento y updatedAt para la actualizacion del mismo por lo que esta propiedad es redundante
    date:{ type: Date, default: Date.now,required:true }
},{ timestamps:true})

// Plugin para la paginacion
userSchema.plugin(mongoosePaginate)

module.exports = model('Users',userSchema)