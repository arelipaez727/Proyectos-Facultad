import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Libro extends Model {}

Libro.init(
    {
        idLibro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        anioPublicacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Libro",
        tableName: "Libro",
        timestamps: false,
    }
);

export default Libro;