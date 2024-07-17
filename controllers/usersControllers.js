const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })  
    //compara el hash
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generacionToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})



const register = asyncHandler(async (req, res) => {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
        res.status(400)
        throw new Error('Ingresa todos los datos')
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('El usuario ya existe')
    } else {
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creacion de usuario
        const user = await User.create({
            nombre,
            email,
            password: hashedPassword
        })
        if (user) {
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email
            })
        }else{
            res.status(400)
            throw new Error('Datos incorrectos')
        }
    }
})

//Generacion de token
const generacionToken = (idUsuario) => {
    return jwt.sign({idUsuario}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

const data =(req, res) => {
    res.status(200).json(req.user)
}

module.exports = {
    login,
    register,
    data,
}