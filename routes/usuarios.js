const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');

router.post('/', 
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email válido').isEmail(),
        check('pass', 'La contraseña debe tener más de 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);

module.exports = router;