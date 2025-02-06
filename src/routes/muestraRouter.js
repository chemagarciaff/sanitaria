const muestraRouter = require("express").Router();
const muestraController = require("./../controllers/muestraController");


muestraRouter.get("/", muestraController.getAllMuestras);


muestraRouter.get("/:id", muestraController.getMuestraById);


muestraRouter.get("/cassette/:idCassette", muestraController.getMuestrasByCassette);


muestraRouter.post("/", muestraController.createMuestra);


muestraRouter.put("/:id", muestraController.updateMuestra);


muestraRouter.delete("/:id", muestraController.deleteMuestra);


muestraRouter.delete("/", muestraController.deleteAllMuestras);


module.exports = muestraRouter;