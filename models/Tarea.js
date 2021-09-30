const mongoose = require('mongoose');

const tareaSchema = mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true,
        unique: true
    },
    image: {
        type: 'image',
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Tarea', userSchema);