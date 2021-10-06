const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// obtiene todos los proyectos
// api/proyectos
router.get('/',
    auth,
    proyectoController.getProyectos
);

router.put('/:id',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

router.delete('/:id',
    auth, proyectoController.delProyecto
);



module.exports = router;