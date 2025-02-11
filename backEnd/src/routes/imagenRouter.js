const imagenRouter = require("express").Router();
const imagenController = require("../controllers/imagenController");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


imagenRouter.get("/", imagenController.getAllImages);


imagenRouter.get("/:id", imagenController.getImageById);


imagenRouter.get("/muestra/:id", imagenController.getImagesByMuestra);


imagenRouter.post("/", upload.single('imagen'), imagenController.createImage);


imagenRouter.put("/:id", imagenController.updateImage);


imagenRouter.patch("/:id", imagenController.updateImage);


imagenRouter.delete("/:id", imagenController.deleteImage);


imagenRouter.delete("/", imagenController.deleteAllImages);


module.exports = imagenRouter;