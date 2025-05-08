//MISION GENERAL DE ESTE ARCHIVO DE MODELS:
// - Estructura las columnas de la tabla
// - Valida los datos antes de ser guardados en la base de datos
// - Define las relaciones entre tablas (si es necesario)
// - Mapea la tabla de la base de datos a un modelo de JavaScript



//Importar dependencias necesarias (necesidad de cada una en el cuaderno)
import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

//Define la clase reparacion que extiende de Model, convierte a la clase en un modelo de Sequelize
// y permite interactuar con la tabla de la base de datos
class Reparacion extends Model {}


//Inicializa el modelo de la tabla "Reparacion" con sus columnas y tipos de datos
// y define las restricciones y validaciones necesarias para cada columna
Reparacion.init(
    {
        idReparacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fechaRecepcion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        nombreCliente: {
            type: DataTypes.STRING,
            allowNull: false,
            len: {
                args: [0, 50],
                msg: "Nombre debe ser tipo caracteres, entre 0 y 50 de longitud",
              },
        },
        tipoEquipo: {
            type: DataTypes.STRING,
            allowNull: false,
            len: {
                args: [0, 30],
                msg: "Ingrese entre 0 y 30 caracteres",
              },
        },
        descripcionProblema: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            len: {
                args: [0, 25],
                msg: "Ingrese entre 0 y 25 caracteres",
              },
        },
        costoEstimado: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        pagado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },

    // Configuración del modelo
    // Se define el nombre de la tabla, si se activan los timestamps y el nombre del modelo
    {
        sequelize,  // Conexión a la base de datos
        modelName: "Reparacion",
        tableName: "Reparacion",
        timestamps: false,
    }
);



// Exporta el modelo para poder usarlo en otras partes de la aplicación
export default Reparacion;