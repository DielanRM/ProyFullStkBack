const express = require('express')
const router = express.Router()
const {getPeliculas, createPeliculas, updatePelicula, deletePelicula} = require('../controllers/peliculasControllers')

router.get('/', getPeliculas)
router.post('/', createPeliculas)
router.put('/:id', updatePelicula)
router.delete('/:id', deletePelicula)

module.exports = router