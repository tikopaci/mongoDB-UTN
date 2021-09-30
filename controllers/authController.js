const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const fs =  require('fs');
const localStorage = require("local-storage");
require('dotenv').config({path: './config/.env'});

const jwtOptions = {
  algorithm: 'RS256', 
  expiresIn:'5h'
};

exports.authUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() })
    };

    try {
        const { email, pass } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return  res.status(400).json({ message: 'El usuario no existe' });     
        }
        //revisar pass
        const passCorrecta = await bcryptjs.compare(pass, user.pass);
        if (!passCorrecta) {
            return res.status(400).json({msg: 'Contraseña incorrecta'});
        }
        //creamos el token (unicamente si la pass coincide)
        const payload = {
            user: {
            id: usuario.id
            }
        }

        jwt.sign(payload, process.env.SECRET, jwtOptions, (error, token) => {
            if (error) throw error;
            localStorage("jwt", token);
            localStorage("user", user);
            res.json({ msg:`Bienvenido ${user.username}.`, token: token });
        });
    } catch (e) {
        console.error(e);
    }
}