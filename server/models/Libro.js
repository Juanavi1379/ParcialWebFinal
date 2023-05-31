const mongoose = require ('mongoose');

const LibroSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },
    fechaConsulta: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Libro', LibroSchema);