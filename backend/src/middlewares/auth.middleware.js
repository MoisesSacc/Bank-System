const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    try {

        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({
                message: 'Token requerido'
            });
        }

        // Extraer el token del formato "Bearer <token>"
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader;

        if (!token) {
            return res.status(401).json({
                message: 'Token inválido'
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Token inválido o expirado'
        });

    }

};

module.exports = verifyToken;