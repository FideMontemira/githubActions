const Usuario = require('../models/Usuario'); 
const authService = require('../auth/AuthService'); 

const login = async (req, res) => {
    const { email, pass } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos (email)'
            });
        }

        const passValido = (pass === usuario.pass); // ¡SOLO PARA DESARROLLO!
        if (!passValido) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos (pass)'
            });
        }

        
        const payload = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        };

        const token = authService.generateToken(payload);

        res.json({
            msg: 'Login OK',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    login
};