const apirouter = require("express").Router();
// const { checkToken } = require("./middlewares");

// const cassetteRouter = require("./cassetteRouter");
// const muestraRouter = require("./muestraRouter");
const usuarioRouter = require("./usuarioRouter");
const imagenRouter = require("./imagenRouter");

// apirouter.use("/cassette", /* checkToken, */ cassetteRouter);
// apirouter.use("/muestra", /* checkToken, */ muestraRouter);
apirouter.use("/usuario", /* checkToken, */ usuarioRouter);
apirouter.use("/images", /* checkToken, */ imagenRouter);

module.exports = apirouter;
