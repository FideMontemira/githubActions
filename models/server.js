const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8085;
        this.middlewares();
        this.paths = {
            usuarios: '/usuarios',
            auth: '/api/auth' // <--- AÑADE ESTA LÍNEA
        };
        this.swaggerSpec = swaggerJsDoc({
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'API de Usuarios (SwaggerEjemplo)',
                    version: '1.0.0',
                    description: 'Una API de ejemplo para gestionar usuarios, documentada con Swagger.',
                },
                servers: [
                    {
                        url: `http://localhost:${this.port}`, 
                    },
                ],
            },
            apis: ['./routes/*.js'], 
        });
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use('/usuarios', require('../routes/usuarios'));
        this.app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(this.swaggerSpec)
        );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
            console.log(`Documentación de Swagger disponible en http://localhost:${this.port}/api-docs`);
        });
    }
}

module.exports = Server;
