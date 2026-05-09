const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

const createTransaction = async (req, res) => {

    try {

        const { cuentaId, tipo, monto, descripcion } = req.body;

        const account = await Account.findById(cuentaId);

        if (!account) {
            return res.status(404).json({
                message: 'Cuenta no encontrada'
            });
        }

        const transaction = new Transaction({
            cuenta: cuentaId,
            tipo,
            monto,
            descripcion
        });

        await transaction.save();

        res.status(201).json({
            message: 'Movimiento registrado',
            transaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getTransactions = async (req, res) => {

    try {

        const { cuentaId } = req.params;

        const transactions = await Transaction.find({
            cuenta: cuentaId
        }).sort({
            createdAt: -1
        });

        res.json(transactions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const transfer = async (req, res) => {

    try {

        const {
            cuentaOrigenId,
            numeroCuentaDestino,
            monto
        } = req.body;

        const cuentaOrigen = await Account.findById(cuentaOrigenId);

        if (!cuentaOrigen) {
            return res.status(404).json({
                message: 'Cuenta origen no encontrada'
            });
        }

        const cuentaDestino = await Account.findOne({
            numeroCuenta: numeroCuentaDestino
        });

        if (!cuentaDestino) {
            return res.status(404).json({
                message: 'Cuenta destino no encontrada'
            });
        }

        if (cuentaOrigen.saldo < monto) {
            return res.status(400).json({
                message: 'Saldo insuficiente'
            });
        }

        cuentaOrigen.saldo -= monto;

        cuentaDestino.saldo += monto;

        await cuentaOrigen.save();
        await cuentaDestino.save();

        await Transaction.create({
            cuenta: cuentaOrigen._id,
            tipo: 'transferencia',
            monto,
            descripcion: `Transferencia enviada a ${cuentaDestino.numeroCuenta}`
        });

        await Transaction.create({
            cuenta: cuentaDestino._id,
            tipo: 'deposito',
            monto,
            descripcion: `Transferencia recibida de ${cuentaOrigen.numeroCuenta}`
        });

        res.json({
            message: 'Transferencia realizada correctamente'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports = {
    createTransaction, getTransactions, transfer
};