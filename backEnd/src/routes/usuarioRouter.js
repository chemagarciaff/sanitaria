const usuarioRouter = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const userToken = require('./middlewares')
const Usuario = require('./../database/models/Usuario');
const checkToken = require("./middlewares");


usuarioRouter.get("/", usuarioController.getAllUsers);


usuarioRouter.get("/:id", usuarioController.getUserById);


usuarioRouter.get("/email/:email", usuarioController.getUserByEmail);


usuarioRouter.post("/", usuarioController.createUser);


usuarioRouter.post("/logUser" ,usuarioController.logUser);
// usuarioRouter.post("/logUser", checkToken);

usuarioRouter.put("/:id", usuarioController.updateUser);


usuarioRouter.patch("/:id", usuarioController.updateUser);


usuarioRouter.delete("/:id", usuarioController.deleteUser);


usuarioRouter.delete("/", usuarioController.deleteAllUsers);

//Ruta de recuperacion de contraseña
usuarioRouter.post("/recuperar", usuarioController.recuperarPassword);

module.exports = usuarioRouter;