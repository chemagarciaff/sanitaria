const usuarioRouter = require("express").Router();
const usuarioController = require("./../controllers/usuarioController");


usuarioRouter.get("/", usuarioController.getAllUsers);


usuarioRouter.get("/:id", usuarioController.getUserById);


usuarioRouter.get("/:email", usuarioController.getUserByEmail);


usuarioRouter.post("/", usuarioController.createUser);


usuarioRouter.put("/:id", usuarioController.updateUser);


usuarioRouter.patch("/:id", usuarioController.updateUser);


usuarioRouter.delete("/:id", usuarioController.deleteUser);


usuarioRouter.delete("/", usuarioController.deleteAllUsers);


module.exports = usuarioRouter;