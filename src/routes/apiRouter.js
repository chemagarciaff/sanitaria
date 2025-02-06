const apirouter = require("express").Router();
// const { checkToken } = require("./middlewares");

const cassetteRouter = require("./cassetteRouter");
const muestraRouter = require("./muestraRouter");
const usuarioRouter = require("./usuarioRouter");
const imagenRouter = require("./imagenRouter");

apirouter.use("/cassettes", /* checkToken, */ cassetteRouter);
apirouter.use("/muestras", /* checkToken, */ muestraRouter);
apirouter.use("/usuarios", /* checkToken, */ usuarioRouter);
apirouter.use("/images", /* checkToken, */ imagenRouter);

module.exports = apirouter;
