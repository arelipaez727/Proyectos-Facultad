
// inicializar-bd.js

import sequelize from '../db.js';
import { inicializarUsuarios } from './usuariosSeeder.js';

(async function main() {
    try {
        await sequelize.authenticate();
        console.log('✔ Conexión establecida con la base de datos');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
    try {
        // Sincronizar la base de datos con el modelo
        // await sequelize.sync(); // crea la tabla si no existe, al agregegar { force: true } se eliminan los datos existentes y se reinicializa la secuencia
        await sequelize.sync({ force: true }); 
        // Luego llamamos a la función que inicializa los usuarios
        await inicializarUsuarios();

        console.log('🟢 Base de datos inicializada desde script');
    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
    }

    process.exit();
})();

