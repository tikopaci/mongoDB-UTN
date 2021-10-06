const Proyecto = require('../models/Proyectos');
const Tarea = require('../models/Tareas');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };

    try {
        const { nombre, proyecto } = req.body;
        const proyect = await Proyecto.findOne({ _id: proyecto });

        if (!proyect) {
            return  res.status(400).json({ message: 'Este proyecto no existe' });
        }

        if (proyect.creador != req.usuario.id) {
            return res.send(`El usuario actual no tiene permisos para acceder al proyecto Nro ${proyecto}`)
        }

        const tarea = new Tarea({ nombre, proyecto });
        tarea.save();
        res.json(tarea);
    } catch (err) {
        console.error(err);
        res.status(500).send('Hubo un error');
    }
};

exports.getAllByProyect = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };

    try {
        const { id_proyecto } = req.body;
        const proyecto = await Proyecto.findOne({ _id: id_proyecto });
        if (!proyecto) return res.send(`El proyecto Nro. ${id_proyecto} no existe.`)

        if (proyecto.creador != req.usuario.id) return res.send(`El usuario actual no tiene permisos para acceder al proyecto Nro ${id_proyecto}`);

        const tareas = await Tarea.find({ proyectoPerteneciente: id_proyecto });
        return res.send(tareas);
    } catch (e) {
        console.error(e);
        res.status(500).send('Hubo un error');
    }
};

exports.getSingle = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };
    try {
        const { id } = req.params;
        const tarea = await Tarea.find ({ _id: id });
        if (!tarea) return res.send(`Tarea no encontrada`);
        
        const proyecto = await Proyecto.find({ _id: id_proyecto });

        if (proyecto.creador != req.usuario.id) return res.send(`El usuario actual no tiene permisos para acceder al proyecto Nro ${id_proyecto}`);

        return res.send(tarea);
    }   catch (e) {
        console.error(e);
        res.status(500).send('Hubo un error');
    }
};

exports.actualizarTarea = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };

    const { nombre } = req.body;
    if(!nombre) return res.status(404).send({ msg: 'Debe ingresar un nombre' });

    try {
        let tarea = await Tarea.findById({ id: req.params.id });

        if (!tarea) return res.send(`Tarea no encontrada`);

        const proyect = await Proyecto.findOne({ _id: tarea.proyecto });
        if (proyect.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: `El usuario actual no tiene permisos para acceder al proyecto Nro ${id_proyecto}` });
        }

        const tareaUpdate = await Tarea.findOneAndUpdate(
            { _id: req.params.id },
            { nombre: nombre },
            { new: true}
        );
        
        res.json({ tareaUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).send('Hubo un error');
    }
};

exports.delTarea = async (req, res) => {
    const errores = validationResult(req, res);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    };

    try {
        let tarea = await Tarea.findById({ id: req.params.id });
        if (!tarea) return res.send(`Tarea no encontrada`);

        const proyect = await Proyecto.findOne({ _id: tarea.proyecto });
        if (proyect.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: `El usuario actual no tiene permisos para acceder al proyecto Nro ${id_proyecto}` });
        }

        const tareaDel = await Tarea.findOneAndDelete({ _id: req.params.id });
        res.send(`La tarea ${req.params.id} ha sido eliminada`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Hubo un error');
    }
};
