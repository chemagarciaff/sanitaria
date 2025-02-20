const cassetteRouter = require("express").Router();
const cassetteController = require("../controllers/cassetteController");


cassetteRouter.get("/", cassetteController.getAllCassettes);


cassetteRouter.get("/:id", cassetteController.getCassettesById);


cassetteRouter.get("/:clave", cassetteController.getCassettesByClave);


cassetteRouter.get("/user/:id", cassetteController.getCassettesByUser);


cassetteRouter.get("/organo/:organo", cassetteController.getCassettesByOrgano);


cassetteRouter.get("/fecha/:fecha", cassetteController.getCassettesByFecha);   


cassetteRouter.get("/fecha/:fechaInicio/:fechaFin", cassetteController.getCassettesBetweenFecha);


cassetteRouter.post("/", cassetteController.createCassette);


cassetteRouter.put("/:id", cassetteController.updateCassette);


cassetteRouter.delete("/:id", cassetteController.deleteCassette);


cassetteRouter.delete("/", cassetteController.deleteAllCassettes);


module.exports = cassetteRouter;