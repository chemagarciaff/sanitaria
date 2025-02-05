const cassetteRouter = require("express").Router();
const cassetteController = require("./../controllers/cassetteController");


cassetteRouter.get("/", cassetteController.getAllCassettes);


cassetteRouter.get("/:id", cassetteController.getCassettesById);


cassetteRouter.post("/", cassetteController.createUser);


cassetteRouter.put("/:id", cassetteController.updateUser);


cassetteRouter.patch("/:id", cassetteController.updateUser);


cassetteRouter.delete("/:id", cassetteController.deleteUser);


cassetteRouter.delete("/", cassetteController.deleteAllUsers);


module.exports = cassetteRouter;