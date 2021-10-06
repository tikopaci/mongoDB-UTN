const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

router.post('/',
auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'Proyecto es obligatorio').not().isEmpty(),
    ],
    tareaController.crearTarea
);

router.get("/", auth, tareaController.getAllByProyect);

router.get("/:id", auth, tareaController.getSingle);

router.put('/:id',
auth, 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    tareaController.actualizarTarea
);

// router.delete('/:id', auth, tareaController.deleteTarea); //Lo ideal sería cambiar el boolean y no eliminar el dato de la bd.

module.exports = router;

