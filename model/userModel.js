const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'Teclea tu nombre']
    },
    email:{
        type: String,
        required: [true, 'Teclea tu email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Teclea tu password']    
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
