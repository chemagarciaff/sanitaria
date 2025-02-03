const apirouter = require("express").Router();
// const { checkToken } = require("./middlewares");

const cassetteRouter = require("./cassetteRouter");
const imagenRouter = require("./imagenRouter");
const muestraRouter = require("./muestraRouter");
const usuarioRouter = require("./usuarioRouter");

apirouter.use("/cassette", /*checkToken,*/ cassetteRouter);
apirouter.use("/imagen", /* checkToken,  */ imagenRouter);
apirouter.use("/muestra", /* checkToken, */ muestraRouter);
apirouter.use("/usuario", /* checkToken, */ usuarioRouter);

module.exports = apirouter;
