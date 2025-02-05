const imagenRouter = require("express").Router();
const imagenController = require("./../controllers/imagenController");
const {Op} = require("sequelize");


imagenRouter.get("/imagenes", imagenController.getAllImages);


imagenRouter.get("/imagenes/:id", imagenController.getImageById);


imagenRouter.post("/imagenes", imagenController.createImage);


imagenRouter.put("/imagenes/:id", imagenController.updateImage);


imagenRouter.patch("/imagenes/:id", imagenController.updateImage);


imagenRouter.delete("/imagenes/:id", imagenController.deleteImage);


imagenRouter.delete("/imagenes/", imagenController.deleteImage);


module.exports = imagenRouter;