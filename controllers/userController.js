const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const fs =  require('fs');
const localStorage = require("local-storage");
require('dotenv').config({path: './config/.env'});


exports.createUser = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() })
    };

    try {
        const { email, pass } = req.body;
        let user = await User.findOne({ email }); // findOne() es una funcion de mongoose que busca un registro único.

        if (user) {
            return  res.status(400).json({ message: 'Ese mail ya esta registrado' })        
        }
        user = new User(req.body);
        const salt = await bcryptjs.genSalt(10); //genera una encriptación
        user.pass = await bcryptjs.hash(pass, salt); //la aplica a lo que le asignamos, en este caso pass
        await user.save();
        //una vez que guarda el usuario, vamos a crear y firmar el JWT
        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // para que el token expire a la hora
        }, (error, token) => {
            if (error) throw error;
            localStorage("jwt", token);
            localStorage("user", user);
            res.json({ msg:`Usuario ${user.username} creado exitosamente.`, token: token });
        });
    } catch (err) {
        console.error(err);
        res.status(400).send("Error al guardar usuario")
    }
};
