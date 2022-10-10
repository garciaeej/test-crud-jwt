const Router = require("express");
const userCtrl  = require("../modules/users/controller/controllers.js")
const { auth } = require("../middleware/jwt.js")
const router = Router()


//rutas Users
router.get('/getAll',auth,userCtrl.getUsers)
router.get('/getUserbyId/:id',userCtrl.getUserbyId)

// Rutas de modificacion sin proteccion
router.post('/createUser',userCtrl.createUser)
router.put('/updateUser/:id',userCtrl.updateUserbyId)
router.delete('/deleteUser/:id',userCtrl.deleteUserbyId)
/////////////////////////////////////////

router.post('/signup',auth,userCtrl.signup)

module.exports= router 