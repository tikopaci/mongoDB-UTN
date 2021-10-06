const Proyecto = require('../models/Proyectos');
const { validationResult } = require('express-validator');

// post
exports.crearProyecto = async (req, res) => {
    // revisamos si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        // crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        // guardar proyecto
        proyecto.save();
        res.json(proyecto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
},

// obtener todos los proyectos del usuario actual
exports.getProyectos = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const proyecto = await Proyecto.find({ creador: req.usuario.id }).sort({creado: -1}); //dentro de la llave va la condicion de busqueda
        res.json(proyecto); // buscar proyectos
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
},

// Update de proyecto - PUT -
exports.actualizarProyecto = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer info del proyecto
    const { nombre } = req.body;
    let proyectoActualizado = {};

    if (nombre) {
        proyectoActualizado = nombre;
    }

    try {
        //revisar el ID
        let proyecto = await Proyecto.findById({ _id: req.params.id });

        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        if (proyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado" });
        }
    //ahora actualizamos
        proyectoUpdated = await Proyecto.findOneAndUpdate({_id: req.params.id}, { nombre: proyectoActualizado }, { new: true });

        res.json({ proyectoUpdated });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el server');
    }
},

exports.delProyecto = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const proyecto = await Proyecto.findById({ _id: req.params.id });
        if (!proyecto) {
            return res.status(404).json({ msg: "El proyecto no existe"  });
        }
        if (proyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado" })
        }

        proyectoRemove = await Proyecto.findOneAndRemove({ _id: req.params.id });
        res.send(`El proyecto Nro. ${req.params.id} ha sido eliminado`)

    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el proyecto');
    }
};




