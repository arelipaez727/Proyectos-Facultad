// routes/obras.js
const express = require("express");
const router = express.Router();
const obras = require('../models/obrasModel');
const { Op } = require("sequelize");

// Obtener todas las obras ordenadas por FechaIngreso con filtro opcional por Artista
router.get("/api/obra", async function (req, res) {
  // #swagger.tags = ['Obras']
  // #swagger.summary = 'Obtiene todas las obras ordenadas por FechaIngreso, con filtro opcional por Artista'
  let where = {};
  
  // Filtro por artista si se proporciona
  if (req.query.Artista != undefined && req.query.Artista !== "") {
    where.Artista = {
      [Op.like]: "%" + req.query.Artista + "%",
    };
  }

  try {
    const { count, rows } = await obras.findAndCountAll({
      order: [["FechaIngreso", "ASC"]],
      where
    });
    
    return res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    console.error("Error al obtener obras:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;