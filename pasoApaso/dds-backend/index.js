
const express = require("express");
const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
const cors = require("cors")


// crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body
app.use(articulosfamiliasmockRouter);
require("./base-orm/sqlite-init");  // crear base si no existe
//controlar ruta
app.get("/", (req, res) => {
    res.send("Backend inicial dds-backend!");

});


app.use(
    cors({
        origin: "*", //origin: 'https://dds-frontend.azurewebsites.net'
    })
);

const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);

const articulosRouter = require("./routes/articulos");
app.use(articulosRouter);

const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);


// levantar servidor



if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  

