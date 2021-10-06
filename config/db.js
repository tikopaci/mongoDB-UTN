const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const conectarDB = async () => {
    try { 
        //la func connect de mongoose recibe 2 parametros -> URL de conexion y un objeto de configuracion
        await mongoose.connect(process.env.DB_MONGO, {});
        console.log('Conectado a mongoDB');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = conectarDB;