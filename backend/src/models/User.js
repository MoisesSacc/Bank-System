const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    intentosFallidos: {
        type: Number,
        default: 0
    },

    bloqueado: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);