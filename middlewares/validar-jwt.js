const authService = require('../auth/AuthService');

const validarJWT = (req, res, next) => {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const payload = authService.verifyToken(token);

        req.usuario = payload;

        next(); 

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    validarJWT
};