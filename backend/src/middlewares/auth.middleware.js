const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    try {

        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({
                message: 'Token requerido'
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Token inválido'
        });

    }

};

module.exports = verifyToken;