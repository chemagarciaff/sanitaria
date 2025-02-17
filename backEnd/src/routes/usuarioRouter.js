const usuarioRouter = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const userToken = require('./middlewares')
const Usuario = require('./../database/models/Usuario');


usuarioRouter.get("/", usuarioController.getAllUsers);


usuarioRouter.get("/:id", usuarioController.getUserById);


usuarioRouter.get("/email/:email", usuarioController.getUserByEmail);


usuarioRouter.post("/", usuarioController.createUser);


usuarioRouter.post("/logUser", userToken.checkToken ,usuarioController.logUser);


usuarioRouter.put("/:id", usuarioController.updateUser);


usuarioRouter.patch("/:id", usuarioController.updateUser);


usuarioRouter.delete("/:id", usuarioController.deleteUser);


usuarioRouter.delete("/", usuarioController.deleteAllUsers);

//Ruta de recuperacion de contraseña
usuarioRouter.post("/recuperar", usuarioController.recuperarPassword);

//Ruta para que solamente el admin pueda cambiar el rol de un usuario
usuarioRouter.put("/:id/rol", usuarioController.isAdmin, usuarioController.changeUserRole);



module.exports = usuarioRouter;