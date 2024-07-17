const axios = require('axios')
const mongoose = require('mongoose')
const Pelicula = require('../model/peliculaModel')

const poblarDB = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=c2525d0edb9b982c034d6f755a582ad4');
        const peliculas = response.data.results;

        // Guarda cada película en la base de datos
        for (const peliculaData of peliculas) {
            const pelicula = new Pelicula({
                adult: peliculaData.adult,
                backdrop_path: peliculaData.backdrop_path,
                genre_ids: peliculaData.genre_ids,
                id: peliculaData.id,
                original_language: peliculaData.original_language,
                original_title: peliculaData.original_title,
                overview: peliculaData.overview,
                popularity: peliculaData.popularity,
                poster_path: peliculaData.poster_path,
                release_date: peliculaData.release_date,
                title: peliculaData.title,
                video: peliculaData.video,
                vote_average: peliculaData.vote_average,
                vote_count: peliculaData.vote_count
            });

            await pelicula.save();
        }

        console.log('Base de datos poblada con éxito');
        //mongoose.connection.close();
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        //mongoose.connection.close();
    }
}

module.exports = poblarDB
