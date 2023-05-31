const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

// Rutas para los libros
router.post('/', libroController.crearLibro);
router.get('/', libroController.obtenerLibros);
router.get('/:id', libroController.obtenerLibro);
router.put('/:id', libroController.actualizarLibros);
router.delete('/:id', libroController.eliminarLibros);

// Ruta para buscar libros
router.get('/buscar/:termino', libroController.buscarLibros);

module.exports = router;