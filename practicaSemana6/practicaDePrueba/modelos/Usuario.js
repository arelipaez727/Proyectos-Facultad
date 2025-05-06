// modelos/Usuario.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false, // Restricción a nivel DB
    unique: true,     // Restricción de unicidad
    validate: {
      len: [4, 20],         // Validación: longitud mínima y máxima
      is: /^[a-zA-Z0-9_]+$/ // Validación: solo caracteres alfanuméricos y guiones bajos
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true // Validación de formato de correo electrónico
    }
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['F', 'M']],
        msg: 'Debe ser F o M'
      }
    }
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: false
});

export default Usuario;
