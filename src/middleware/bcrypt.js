const bcrypt = require("bcrypt");

 const Bcrypt = {

    //encriptar contrasena
    encryptPassword: async (pass)=>{
        const salt = await bcrypt.genSalt(10)  
        return bcrypt.hash(pass,salt)

    },
    // Validar password
    validatePassword: async(password,reqPassword)=>{
        return bcrypt.compare(password,reqPassword)
    }

}

module.exports =  Bcrypt