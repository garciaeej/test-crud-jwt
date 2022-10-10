const Users = require("../../../db/models/users.model.js")
const Bcrypt = require('../../../middleware/bcrypt.js');
///// funciones sin usar 
const { sign,verifyToken,auth } = require("../../../middleware/jwt.js")
const dotenv = require("dotenv");
const env = require("../../../config/config.services.js")


dotenv.config()

    // Obtener todos los usuarios
const getUsers = async (req,res ) =>{

     
    const optionsQuery = {
        limit:req.query.limit,
        sort: {createdAt:-1},
        page:req.query.page,
    
    }

    try {
        // metodo para obtener la consulta en paginado
        const data = await Users.paginate({},optionsQuery)
        return res.json({
            message:"Users found successfully",
            data: {data}
        })

    } catch (error) {
        return res.json({message:"users were not found"})
    }

}

// obtener datos de usuarios por ID
const getUserbyId = async (req,res) =>{

    const { id } = req.params
    try {
        const getUser = await Users.findById(id)
        return res.json({
            message:"User found successfully",
            data: {getUser}
        })
        
    } catch (error) {
        return res.json({message:"User found successfully"})
    }
    
}

// Crear Usuarios
const createUser = async (req,res) =>{


    let {name,lastname,email,password,date} = req.body
    try {
        // if(name === "" || lastname === "" || email === "" || password === "" || (date == null || date == ""))
        //     return res.status(400).json({message:"Empty Fields"});

        password = await Bcrypt.encryptPassword(password)
        const user = new Users({name,lastname,email,password,date})
    
        await user.save()
        // usuarios creados Http code 201 CREATED
        return res.status(201).json(user);
        
    } catch (error) {
        /* HTTP Status no debe ser 200 cuando un usuario NO fue creado, en su lugar debe especificarse
           Su correspondiente status code (400) Bad Request para datos en blanco,
           500 Server Internal Error para errores ocasionados por el server
           401 Unauthorized para intentar la  
        */
        return res.code(500).json({message:"user was not created"});
    }
}

// Actualizar datos de usuarios por ID
const updateUserbyId = async (req,res) =>{

    //const {name,lastname,password,email} = req.body
    const{id} = req.params
    try {
        // No verificas el Body si este posee data o no en su body
        const newDataUser = await Users.findByIdAndUpdate(id,req.body)
        /// Http
        return res.json(newDataUser)    
        
    } catch (error) {
        //// Http
        return res.json("User no exists")    
    }

}
// Eliminar usuario por ID
const deleteUserbyId = async (req,res) =>{

    const{id} = req.params

    try {
        //// no verificas que el id exista y de un http 404 not found en caso que el documento no exista
        await Users.findByIdAndDelete(id)
        res.json("User deleted")
    } catch (error) {
        /// http
        res.json("User no exists")        
    }

}

// Login
const signup = async (req,res) =>{

    // Obtener el header token
    const token = await req.headers['x-access-token']

// Verificamos si existe
if(token){
  return await res.json({ auth:false, message: "verificaded token exists"})
}

    const {email,password} = req.body
    const userSelected = await Users.findOne({ email})
    console.log(userSelected);
    
// Verificamos si existe el usuario
    if(!userSelected) return res.json({ message:"no existe"})
    
    // Creamos JWT por el ID
    const newJWT = await sign(userSelected.id,env.JWT_KEY)

    if (!newJWT) return res.json({
        message:"token not created",
        token:false
    })

    return res.json({
        message:"token created",
        token:newJWT})

}

module.exports = {
    getUsers,
getUserbyId,
createUser,
updateUserbyId,
deleteUserbyId,
signup
}