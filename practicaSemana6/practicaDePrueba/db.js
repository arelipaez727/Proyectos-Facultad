// db.js
import { Sequelize } from 'sequelize';

// Configuración de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './datos/db.sqlite',
  logging: false // Desactiva el logging por defecto
});

// Funciones para controlar el logging
export function enableDbLog() {
  sequelize.options.logging = console.log;
}

export function disableDbLog() {
  sequelize.options.logging = false;
}

// Exporta la instancia de sequelize
export default sequelize;