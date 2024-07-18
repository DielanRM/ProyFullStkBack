const asyncHandler = require('express-async-handler')
const Pelicula = require('../model/peliculaModel')


const getPeliculas = asyncHandler(async (req, res) => {
    const peliculas = await Pelicula.find({ user: req.user.id })
    res.status(200).json(peliculas)
})


const createPeliculas = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "escribe" })
        throw new Error('Escribe el titulo de la pelilcula')
    }
    const pelicula = await Pelicula.create({
        adult: req.body.adult,
        backdrop_path: req.body.backdrop_path,
        genre_ids: req.body.genre_ids,
        id: req.body.id,
        original_language: req.body.original_language,
        original_title: req.body.original_title,
        overview: req.body.overview,
        popularity: req.body.popularity,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
        title: req.body.title,
        video: req.body.video,
        vote_average: req.body.vote_average,
        vote_count: req.body.vote_count,
        user: req.user.id
    })

    res.status(201).json(pelicula)
})


const updatePelicula = asyncHandler(async (req, res) => {
    const pelicula = await Pelicula.findById(req.params.id)

    if (!pelicula) {
        res.status(400)
        throw new Error('Pelicula no encontrada')
    } else {

        //verificacion de pertenencia al usuario
        if (pelicula.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Usuario no autorizado')
        } else {
            const peliculaUpdated = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true }) //Devuelve elemento ya modificado
            res.status(200).json(peliculaUpdated)
        }
    }
})


const deletePelicula = asyncHandler(async (req, res) => {
    const pelicula = await Pelicula.findById(req.params.id)

    if (!pelicula) {
        res.status(400)
        throw new Error('Pelicula no encontrada')
    } else {
        //verificacion de pertenencia al usuario
        if (pelicula.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Usuario no autorizado')
        } else {
            await pelicula.deleteOne()
            res.status(200).json({ id: req.params.id })
        }
    }
})

module.exports = {
    getPeliculas,
    createPeliculas,
    updatePelicula,
    deletePelicula
}