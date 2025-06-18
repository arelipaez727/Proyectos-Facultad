const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const contratos = require('../models/contratosModel'); // Asegúrate de que la ruta sea correcta

// GET /api/contratos?NombreContrato=valor
router.get('/api/contratos', async (req, res) => {
  try {
    const { NombreContrato } = req.query;
    
    const whereClause = NombreContrato ? {
      NombreContrato: {
        [Op.like]: `%${NombreContrato}%` // Búsqueda case-insensitive
      }
    } : {};

    const resultados = await contratos.findAll({
      where: whereClause,
      order: [['NombreContrato', 'ASC']] // Orden alfabético
    });

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar contratos' });
  }
});

// POST /api/contratos
router.post('/api/contratos/', async (req, res) => {
  try {
    const nuevoContrato = await contratos.create(req.body);
    res.status(201).json(nuevoContrato);
  } catch (error) {
    res.status(400).json({ 
      error: 'Error al crear el contrato',
      detalles: error.message 
    });
  }
});

module.exports = router;
