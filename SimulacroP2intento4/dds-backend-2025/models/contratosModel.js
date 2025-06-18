const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const contratos = sequelize.define('contratos', {
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
        msg: 'El nombre del contrato no puede estar vacío'
        }
    }
  },
  FechaInicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'La fecha de inicio debe ser una fecha válida'
      },
      notNull: {
        msg: 'La fecha de inicio es obligatoria'
      }
    }
  },
  FechaFin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'La fecha de fin debe ser una fecha válida'
      },
      notNull: {
        msg: 'La fecha de fin es obligatoria'
      }
    }
  },
  ImporteMensual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'El importe debe ser un número decimal válido'
      },
      min: {
        args: [0.01],
        msg: 'El importe mensual debe ser mayor a cero'
      },
      notNull: {
        msg: 'El importe mensual es obligatorio'
      }
    }
  },
  TelefonoContacto: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El teléfono de contacto es obligatorio'
      },
      notEmpty: {
        msg: 'El teléfono de contacto no puede estar vacío'
      }
  }
}

});

module.exports = contratos;