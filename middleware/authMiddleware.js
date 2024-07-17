const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//Middleware para proteccion de los endPoints
const protect = asyncHandler(async(req, res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {//Obtencion de token
            token = req.headers.authorization.split(' ')[1] //se convierte en un array
        
            //validacion de el token y que esta no este caducado
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtencion del token datos de usuario
            req.user = await User.findById(decoded.idUsuario).select('-password')

            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporciono ningun token')
    }
})

module.exports = { protect }