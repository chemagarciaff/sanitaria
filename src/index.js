const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// conexión con mysql y relaciones
const sequelize = require("./database/db");
require("./database/associations.js")

// Conversión a json datos que nos envían para post, put, patch...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const apiroutes = require("./routes/apiRouter");
// app.use("/sanitaria", apiroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor eschando en http://localhost:${PORT}`);

  sequelize
  .sync({force: false})
  .then(() => console.log('Conectado a sanitaria')) 
});
