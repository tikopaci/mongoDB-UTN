const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config({path: './config/.env'});

exports.crearUsuario = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() })
    };

    const { email, pass } = req.body;
    
    try {
        let usuario = await Usuario.findOne({ email }); // findOne() es una funcion de mongoose que busca un registro único.

        if (usuario) {
            return  res.status(400).json({ message: 'Ese mail ya esta registrado' })        
        }
        usuario = new Usuario(req.body);
        const salt = await bcryptjs.genSalt(10); //genera una encriptación
        usuario.pass = await bcryptjs.hash(pass, salt); //la aplica a lo que le asignamos, en este caso pass
        await usuario.save();
        //una vez que guarda el usuario, vamos a crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id,
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // para que el token expire a la hora
        }, (error, token) => {
            if (error) throw error;
            res.json({ msg:`Usuario ${usuario.username} creado exitosamente.`, token: token });
        });
    } catch (err) {
        console.error(err);
        res.status(400).send("Hubo un error");
    }
};

exports.getAllUsers = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() })
    };

    try {
        Usuario.find({}).then(usuarios => { res.json(usuarios) });
    } catch (err) {
        console.error(err);
        res.status(400).send("Hubo un error");
    }
};