const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        trim: true,
        unique: true
    },
    pass: {
        type: 'string',
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', userSchema);