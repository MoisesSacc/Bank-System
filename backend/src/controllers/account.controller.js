const Account = require('../models/Account');

const createAccount = async (req, res) => {

    try {

        const { numeroCuenta, tipoCuenta, saldo } = req.body;

        const accountExists = await Account.findOne({ numeroCuenta });

        if (accountExists) {
            return res.status(400).json({
                message: 'La cuenta ya existe'
            });
        }

        const newAccount = new Account({
            usuario: req.user.id,
            numeroCuenta,
            tipoCuenta,
            saldo
        });

        await newAccount.save();

        res.status(201).json({
            message: 'Cuenta creada correctamente',
            account: newAccount
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createAccount
};