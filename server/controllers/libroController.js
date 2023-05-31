const Libro = require("../models/Libro");

exports.crearLibro = async (req, res) => {
  try {
    // Creamos el libro utilizando req.body directamente
    const libro = new Libro(req.body);

    // Guardamos el libro en la base de datos
    await libro.save();

    res.json({ mensaje: "Libro creado exitosamente", libro });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error en el servidor" });
  }
};

exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error en el servidor" });
  }
};

exports.actualizarLibros = async (req, res) => {
    try {
      const { nombre, genero, autor, paginas } = req.body;
  
      const libro = await Libro.findByIdAndUpdate(
        req.params.id,
        { nombre, genero, autor, paginas },
        { new: true }
      );
  
      if (!libro) {
        return res.status(404).json({ mensaje: "No existe el libro que estás buscando" });
      }
  
      res.json(libro);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
  };

  exports.obtenerLibro = async (req, res) => {
    try {
      const libro = await Libro.findById(req.params.id);
      
      if (!libro) {
        return res.status(404).json({ mensaje: "No existe el libro que estás buscando" });
      }
      
      res.json(libro);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
  };

  exports.eliminarLibros = async (req, res) => {
    try {
      const libro = await Libro.findById(req.params.id);
      
      if (!libro) {
        return res.status(404).json({ mensaje: "No existe el libro que estás buscando" });
      }

      await Libro.findOneAndRemove({ _id: req.params.id })
      res.json({msg: 'Se elimino el libro seleccionado'});
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
  };
  
  exports.buscarLibros = async (req, res) => {
    try {
      const termino = req.params.termino;
      const resultados = await Libro.find({ nombre: { $regex: termino, $options: 'i' } });
      res.json(resultados);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Hubo un error al buscar los libros' });
    }
  }