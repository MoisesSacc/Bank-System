const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {

    try {

        const { nombre, correo, password } = req.body;

        // Validaciones
        if (!nombre || !correo || !password) {
            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

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
const login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        // Validaciones
        if (!correo || !password) {
            return res.status(400).json({
                message: 'Correo y contraseña son requeridos'
            });
        }

        const user = await User.findOne({ correo });

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        if (user.bloqueado) {
            return res.status(403).json({
                message: 'Cuenta bloqueada por múltiples intentos fallidos'
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {

            user.intentosFallidos += 1;

            if (user.intentosFallidos >= 5) {
                user.bloqueado = true;
            }

            await user.save();

            return res.status(401).json({
                message: 'Contraseña incorrecta',
                intentosRestantes: 5 - user.intentosFallidos
            });
        }

        user.intentosFallidos = 0;

        await user.save();

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        res.json({
            message: 'Login exitoso',
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    register, login
};