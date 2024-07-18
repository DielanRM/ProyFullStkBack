const express = require('express')
const router = express.Router()
const {getPeliculas, createPeliculas, updatePelicula, deletePelicula} = require('../controllers/peliculasControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getPeliculas)
router.post('/', protect, createPeliculas)
router.put('/:id', protect, updatePelicula)
router.delete('/:id', deletePelicula)

module.exports = router