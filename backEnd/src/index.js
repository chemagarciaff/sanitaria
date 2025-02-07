const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();

// conexión con mysql y relaciones
const sequelize = require("./database/db.js");
require("./database/associations.js")

// Conversión a json datos que nos envían para post, put, patch...
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiroutes = require("./routes/apiRouter.js");
app.use("/sanitaria", apiroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor eschando en http://localhost:${PORT}`);

  sequelize
  .sync({force: true})
  .then(() => console.log('Conectado a sanitaria')) 
});
