const apirouter = require("express").Router();
const middlewares = require('./middlewares')
// const { checkToken } = require("./middlewares");

const cassetteRouter = require("./cassetteRouter");
const muestraRouter = require("./muestraRouter");
const usuarioRouter = require("./usuarioRouter");
const imagenRouter = require("./imagenRouter");

apirouter.use("/cassettes", middlewares.checkToken, cassetteRouter);
apirouter.use("/muestras", middlewares.checkToken, muestraRouter);
apirouter.use("/usuarios", usuarioRouter);
apirouter.use("/imagenes", middlewares.checkToken, imagenRouter);

module.exports = apirouter;
