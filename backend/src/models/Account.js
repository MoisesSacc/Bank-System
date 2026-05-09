const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    numeroCuenta: {
        type: String,
        required: true,
        unique: true
    },

    tipoCuenta: {
        type: String,
        enum: ['ahorro', 'corriente', 'cts'],
        required: true
    },

    saldo: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);