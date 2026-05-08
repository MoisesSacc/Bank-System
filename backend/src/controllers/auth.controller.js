const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {

    try {

        const { nombre, correo, password } = req.body;

        const userExists = await User.findOne({ correo });

        if (userExists) {
            return res.status(400).json({
                message: 'El correo ya existe'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            nombre,
            correo,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'Usuario registrado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    register
};