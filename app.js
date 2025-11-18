require('dotenv').config();
const sequelize = require('./models/database'); 
const Server = require('./models/server');
require('./models/Usuario');

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida exitosamente.');

        await sequelize.sync(); 
        console.log('Modelos sincronizados con la base de datos.');

        const server = new Server();
        server.listen();

    } catch (error) {
        console.error('No se pudo iniciar la aplicación:', error);
    }
}

main();
