const usuarioRouter = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const userToken = require('./middlewares')
const Usuario = require('./../database/models/Usuario');
const checkToken = require("./middlewares");


usuarioRouter.get("/", usuarioController.getAllUsers);


usuarioRouter.get("/:id", usuarioController.getUserById);


usuarioRouter.get("/email/:email", usuarioController.getUserByEmail);


usuarioRouter.get("/rol/:rol", usuarioController.getUsersByRol);


usuarioRouter.post("/", usuarioController.createUser);


<<<<<<< HEAD
usuarioRouter.post("/logUser" ,checkToken,usuarioController.logUser);
// usuarioRouter.post("/logUser", checkToken);
=======
usuarioRouter.post("/logUser", usuarioController.logUser);

>>>>>>> 1e3274e21c5c1389ff22b37fafd1015d56c02034

usuarioRouter.put("/:id", usuarioController.updateUser);


usuarioRouter.patch("/:id", usuarioController.updateUser);


usuarioRouter.delete("/:id", usuarioController.deleteUser);


usuarioRouter.delete("/", usuarioController.deleteAllUsers);

//Ruta de recuperacion de contraseña
usuarioRouter.post("/recuperar", usuarioController.recuperarPassword);



module.exports = usuarioRouter;