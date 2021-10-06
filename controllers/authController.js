const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.authUsuario = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() })
    };
    // Extraemos mail y pass del body
    const { email, pass } = req.body;

    try {
        // Chequeamos que el usuario exista
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return  res.status(400).json({ message: 'El usuario no existe' });     
        }
        //revisar pass
        const passCorrecta = await bcryptjs.compare(pass, usuario.pass);
        if (!passCorrecta) {
            return res.status(400).json({msg: 'Contraseña incorrecta'});
        }
        //creamos el token (unicamente si la pass coincide)
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 8600
        }, (error, token) => {
            if (error) throw error;
            res.json({ msg:`Bienvenido ${usuario.username}.`, token: token });
        });
        
    } catch (e) {
        console.error(e);
    }
};
