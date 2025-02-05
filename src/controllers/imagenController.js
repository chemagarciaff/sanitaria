const imagenService = require("./../services/imagenService");



/**
 * Obtener todas las imagenes
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllImages = async (req, res) => {
  try {
    const images = await imagenService.getAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Obtenemos una imagen por identificador
 * 
 * El identificador lo pasamos como parametro
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imagenService.getClientById(id);
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Obtenemos las imagenes de una muestra
 * 
 * El identificador de la muestra lo pasamos por parametro
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getImagesByMuestra = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await imagenService.getClientById(id);
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




/**
 * Crear una imagen
 * Pasamos el cuerpo de la nueva imagen
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createImage = async (req, res) => {
  try {
    const body = req.body;

    const createdImage = await imagenService.createUser(body);
    res.status(201).json(createdImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Actualizar una imagen
 * Pasamos el id de la imagen que queremos actualizar
 * PAsamos el cuerpo que queremos actualizar 
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedImage = await imagenService.updateImage(id, body);

    if (updatedImage) {
      res.status(200).json(updatedImage);
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Eliminar una sola imagen
 * Pasamos id por parametro
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await imagenService.deleteImage(id);
    
    if (deletedImage) {
      res.status(204).json({ message: "Imagen eliminada" });
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Borrar todas las imagenes.
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteAllImages = async (req, res) => {
  try {

    const deletedImages = await imagenService.deleteAllImages();

    if (deletedImages) {
      res.status(204).json({ message: "Imagenes eliminadas" });
    } else {
      res.status(404).json({ message: "Imagenes no encontradas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
    getAllImages,
    getImageById,
    getImagesByMuestra,
    createImage,
    updateImage,
    deleteImage,
    deleteAllImages
  };

