const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'            
    },
    estado: {
        type: Boolean,      
        default: false
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);