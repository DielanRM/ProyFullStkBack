const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const login = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'login' })
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

const data = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'data' })
})

module.exports = {
    login,
    register,
    data,
}