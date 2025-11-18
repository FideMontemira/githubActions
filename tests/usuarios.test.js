const supertest = require('supertest');
const Server = require('../models/server'); 
const sequelize = require('../models/database'); 
require('../models/Usuario');

const server = new Server();
const app = server.app; 
const request = supertest(app); 

beforeAll(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); 
        console.log('Base de datos conectada y sincronizada para pruebas');
    } catch (error) {
        console.error('Error al iniciar la BD para pruebas:', error);
    }
});

afterAll(async () => {
    await sequelize.close();
    console.log('Conexión de BD cerrada');
});

describe('Pruebas de API para /usuarios', () => {
    test('GET /usuarios debe devolver un array vacío al inicio', async () => {
        const response = await request.get('/usuarios');

        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(0); 
    });

    test('POST /usuarios debe crear un usuario correctamente', async () => {
        const nuevoUsuario = {
            nombre: 'Usuario de Prueba',
            email: 'prueba@test.com',
            pass: '123456'
        };

        const response = await request.post('/usuarios')
            .send(nuevoUsuario);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id'); 
        expect(response.body.nombre).toBe(nuevoUsuario.nombre);
    });

    test('POST /usuarios no debe crear un usuario con email inválido', async () => {
        const usuarioInvalido = {
            nombre: 'Usuario Malo',
            email: 'esto-no-es-un-email',
            pass: '123'
        };

        const response = await request.post('/usuarios')
            .send(usuarioInvalido);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors.length).toBe(2);
    });

    test('GET /usuarios debe devolver los usuarios creados', async () => {
        const response = await request.get('/usuarios');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1); 
        expect(response.body[0].nombre).toBe('Usuario de Prueba');
    });

});