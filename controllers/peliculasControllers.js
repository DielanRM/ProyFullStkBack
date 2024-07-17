const asyncHandler = require('express-async-handler')
const Pelicula = require('../model/peliculaModel')

const getPeliculas = asyncHandler(async (req, res) => {
    const peliculas = await Pelicula.find()
    res.status(200).json(peliculas)
})

const createPeliculas = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400).json({message: "escribe"})
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
        vote_count: req.body.vote_count
    })
        
    res.status(201).json(pelicula)
})



const updatePelicula = asyncHandler(async (req, res) => {
    res.status(200).json({message: `updated ${req.params.id}`})
})



const deletePelicula = asyncHandler(async (req, res) => {
    res.status(200).json({message: `deleted ${req.params.id}`})
})

module.exports = {
    getPeliculas,
    createPeliculas,
    updatePelicula,
    deletePelicula
}