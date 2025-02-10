const usuarioRouter = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const userToken = require('./middlewares')


usuarioRouter.get("/", usuarioController.getAllUsers);


usuarioRouter.get("/:id", usuarioController.getUserById);


usuarioRouter.get("/email/:email", usuarioController.getUserByEmail);


usuarioRouter.post("/", usuarioController.createUser);


usuarioRouter.post("/logUser", userToken.checkToken ,usuarioController.logUser);


usuarioRouter.put("/:id", usuarioController.updateUser);


usuarioRouter.patch("/:id", usuarioController.updateUser);


usuarioRouter.delete("/:id", usuarioController.deleteUser);


usuarioRouter.delete("/", usuarioController.deleteAllUsers);


module.exports = usuarioRouter;