import { Reparacion } from '../models/Reparacion.js';

// Obtener todas las reparaciones
async function getAll() {
  return await Reparacion.findAll();
}

// Buscar reparaciones por nombre del cliente (comienza con...)
async function getAllByCliente(nombreCliente) {
  return await Reparacion.findAll({
    where: {
      nombreCliente: {
        [require('sequelize').Op.like]: `${nombreCliente}%`
      }
    }
  });
}

export { getAll, getAllByCliente };