const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

class AuthService {
    constructor() {
        
        this.privateKey = fs.readFileSync(path.join(__dirname, 'keys', 'private.key'), 'utf8');
        this.publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'public.key'), 'utf8');
    }

    generateToken(payload, options = {}) {
        const signOptions = {
            algorithm: 'RS256',
            expiresIn: options.expiresIn || '1h', // 1 hora de expiración
            issuer: 'MiSistemaDeUsuarios'
        };

        return jwt.sign(payload, this.privateKey, signOptions);
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
        } catch (error) {
            console.error('Error al verificar token:', error.message);
            throw new Error('Token inválido o expirado');
        }
    }
}

module.exports = new AuthService();