const Payment = require('../models/Payment');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

const payService = async (req, res) => {

    try {

        const {
            cuentaId,
            servicio,
            monto
        } = req.body;

        // Validaciones
        if (!cuentaId || !servicio || !monto) {
            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });
        }

        if (monto <= 0) {
            return res.status(400).json({
                message: 'El monto debe ser mayor a 0'
            });
        }

        const account = await Account.findById(cuentaId);

        if (!account) {
            return res.status(404).json({
                message: 'Cuenta no encontrada'
            });
        }

        if (account.saldo < monto) {
            return res.status(400).json({
                message: 'Saldo insuficiente'
            });
        }

        account.saldo -= monto;

        await account.save();

        const payment = new Payment({
            cuenta: cuentaId,
            servicio,
            monto
        });

        await payment.save();

        await Transaction.create({
            cuenta: cuentaId,
            tipo: 'pago_servicio',
            monto,
            descripcion: `Pago de ${servicio}`
        });

        res.status(201).json({
            message: 'Pago realizado correctamente',
            payment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    payService
};