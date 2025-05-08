//MISION GENERAL DE ESTE ARCHIVO db.js:
// -Configura Sequelize para conectarse a la base de datos SQLite
// -Define un logger personalizado para formatear y mostrar las consultas SQL ejecutadas


//Importaciones necesarias (necesidad de cada una en el cuaderno)
import { Sequelize } from "sequelize";
import { format } from "sql-formatter";


//Toma las consultas SQL que Sequelize ejecuta y las muestra en la consola formateadas y legibles.
//Personaliza cómo Sequelize muestra las consulas SQL en la consola

//Recibe como parametro (sql) que vendria a ser la consulta SQL que se ejecuta
const customLogger = (sql) => {
    try { //Ejecuta el codigo dentro del bloque try y limpia la consulta eliminando el texto redundante Executin(default): "
        const clean = sql.replace("Executing (default): ", "");

        // Formatear con format solo si no contiene parámetros $ ? o bindings
        if (!clean.includes("$") && !clean.includes("?")) {
            console.log(`\n📝 SQL ejecutado:\n${format(clean)}`);
        }
        else {
            console.log(`\n🔍 SQL:\n${clean}`); // Mostrar sin formatear si es más complejo
        }
    } // si algo falla, ejemplo: clean no es string, se ejecuta el bloque catch
    catch (error) {
        console.warn("⚠️ Error en logger personalizado:", error.message);
        console.log(sql); //Termina mostrando el sql sin procesar aunque el formateo falle
    }
};


// Recien aca se hace la configuración de Sequelize con SQLite
//Crea la conexión a una base de datos SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",  //Especifica el tipo de base de datos a usar, en este caso SQLite
    storage: "./data/libros.sqlite",  //Ruta donde se guardara el archivo de la base de datos SQLite, si no existe, se crea automáticamente
    logging: customLogger,  //Asigna el logger personalizado para mostrar las consultas SQL en la consola
});


//Funciones para controlar Logs
//enableDbLog: Enciende el logger para mostrar consultas SQL formateadas en la consola
//disableDbLog: Apaga el logger para no mostrar consultas SQL en la consola
export function enableDbLog() {
    sequelize.options.logging = customLogger;
}

export function disableDbLog() {
    sequelize.options.logging = false; // Desactivar el logger
}

export default sequelize;

/*Esto todo es siempre igual, cambiar lo que corresponde */