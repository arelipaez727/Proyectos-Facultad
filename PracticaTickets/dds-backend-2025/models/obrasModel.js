//obrasModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const obras = sequelize.define(
  "obras",
  {
    IdObra: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Titulo: {
      type: DataTypes.STRING,
    },
    Artista: {
      type: DataTypes.STRING,
    },
    FechaIngreso: {
      type: DataTypes.DATEONLY,
    },
    ValorEstimadoPesos: {
      type: DataTypes.DECIMAL,
    },
    EnExhibicion: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    // Configuraciones adicionales (sin hooks en este caso)
  }
);

module.exports = obras;