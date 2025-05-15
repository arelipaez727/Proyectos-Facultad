const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/articulosfamilias", async function (req, res, next) {
  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
});
res.json(data);
});

router.get("/api/articulosfamilias/:id", async function (req, res, next) {
    try {
      // Obtener el ID desde los parámetros de la URL
      const { id } = req.params;
  
      // Buscar el artículo de familia por su ID
      let articuloFamilia = await db.articulosfamilias.findOne({
        where: { IdArticuloFamilia: id },
        attributes: ["IdArticuloFamilia", "Nombre"],
      });
  
      // Verificar si el artículo de familia existe
      if (articuloFamilia) {
        res.json(articuloFamilia);
      } else {
        res.status(404).json({ message: "Articulofamilia no encontrado" });
      }
    } catch (error) {
      // Manejo de errores en la consulta
      console.error(error);
      res.status(500).json({ message: "Error al consultar el artículo de familia" });
    }
  });
  


module.exports = router;
