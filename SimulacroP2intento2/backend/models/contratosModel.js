//AGREGADO POR MI TODO

const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const contrato = sequelize.define('Contrato', {
    IdContrato: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NombreContrato: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del contrato es obligatorio'
        }
      }
    },
    FechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'La fecha de inicio debe ser válida (YYYY-MM-DD)'
        }
      }
    },
    FechaFin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'La fecha de fin debe ser válida (YYYY-MM-DD)'
        }
      }
    },
    ImporteMensual: {
      type: DataTypes.DECIMAL(12, 2), // Hasta 12 dígitos, 2 decimales
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'El importe debe ser un número decimal válido'
        },
        min: {
          args: [0],
          msg: 'El importe no puede ser negativo'
        }
      }
    },
    TelefonoContacto: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9()+-\s]+$/, // Validación básica de teléfono
          msg: 'El teléfono solo puede contener números y caracteres especiales'
        }
      }
    }
  }, {
    tableName: 'contratos', // Nombre exacto de la tabla en la BD
    timestamps: false, // Si no necesitas createdAt/updatedAt
    freezeTableName: true // Evita que Sequelize pluralice el nombre
  });

module.exports = contrato;