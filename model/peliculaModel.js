const { text } = require('body-parser')
const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const peliculaSchema = mongoose.Schema({
    adult: { type: Boolean, required: true },
    backdrop_path: { type: String, required: true },
    genre_ids: { type: [Number], required: true },
    id: { type: Number, required: true, unique: true },
    original_language: { type: String, required: true },
    original_title: { type: String, required: true },
    overview: { type: String },
    popularity: { type: Number, required: true },
    poster_path: { type: String, required: true },
    release_date: { type: Date, required: true },
    title: { type: String, required: true },
    video: { type: Boolean, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pelicula', peliculaSchema)