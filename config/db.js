const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Data Base connected ${connected.connection.host}`.blue.underline)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB