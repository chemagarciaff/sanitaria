const cassetteRouter = require("express").Router();
const cassetteController = require("./../controllers/cassetteController");


cassetteRouter.get("/", cassetteController.getAllCassettes);


cassetteRouter.get("/:id", cassetteController.getCassettesById);


cassetteRouter.get("/user/:id", cassetteController.getCassettesByUser);


cassetteRouter.get("/organo/:id", cassetteController.getCassettesByOrgano);


cassetteRouter.get("/fecha/:id", cassetteController.getCassettesByFecha);   


cassetteRouter.get("/fecha/:fechaInicio/:fechaFin", cassetteController.getCassettesByFecha);


cassetteRouter.post("/", cassetteController.createCassette);


cassetteRouter.put("/:id", cassetteController.updateCassette);


cassetteRouter.delete("/:id", cassetteController.deleteCassette);


module.exports = cassetteRouter;