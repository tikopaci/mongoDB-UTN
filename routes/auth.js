const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('./../controllers/authController');

router.post('/',
    [
        check('email', "Agregar un email válido").isEmail(),
        check('pass', 'La contraseña debe contener al menos 6 caracteres').isLength({ min: 6})
    ],
    authController.authUsuario
);

module.exports = router;