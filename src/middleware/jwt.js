const jwt = require('jsonwebtoken')
    
    // Funcion para crear token
    async function sign (objJWT,secret){

        const signJWT = await jwt.sign(objJWT,secret)
        if (!signJWT)  return {message:"token was not create"}

        return signJWT
    }
    // Funcion para verificar lo tokens
    async function verifyToken(token,secret){

        const idVerificaded = jwt.verify(token,secret)

        // Verificamos si coinciden
        if(this.id !== idVerificaded) return this.res.json({message:"tokens aren't the same"})
        return this.res.json({message:"tokens are the same"})
    }

    // Funcion para autenticar
    async function auth (req,res,next){

        const token = await req.headers['x-access-token']

        console.log("token",token);

    if(!token) return await res.json({ auth:false, message: "verificaded token not exists"})


    return next() 

    }

module.exports = { sign,verifyToken,auth }
