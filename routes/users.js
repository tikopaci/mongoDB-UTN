const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('./../controllers/userController');

router.post('/', 
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email válido').isEmail(),
        check('pass', 'La contraseña debe tener más de 6 caracteres').isLength({min: 6})
    ],
    userController.createUser
);

module.exports = router;