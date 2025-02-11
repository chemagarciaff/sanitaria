const Imagen = require("../database/models/Imagen");

const getAllImages = async () => {
  try {
    return await Imagen.findAll();
  } catch (error) {
    throw new Error("Error al pedir todos los imagenes: " + error.message);
  }
};

const getImageById = async (id) => {
  try {
    return await Imagen.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un imagen por id: " + error.message);
  }
};

const getImagesByMuestra = async (idMuestra) => {
  try {
    return await Imagen.findAll({
      where: {
        muestraIdMuestra: idMuestra,
      }
    })
  } catch (error) {
    throw new Error("Error al pedir un imagen por muestra: " + error.message);
  }
};

const createImage = async (imgData) => {
  try {
    return await Imagen.create(imgData);
  } catch (error) {
    throw new Error("Error al crear la imagen: " + error.message);
  }
};

const updateImage = async (id, imgData) => {
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      throw new Error("imagen no encontrado");
    }
    return await imagen.update(imgData);
  } catch (error) {
    throw new Error("Error al modificar la imagen: " + error.message);
  }
};


const deleteImage = async (id) => {
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      throw new Error("La imagen no existe");
    }
    return await imagen.destroy();
  } catch (error) {
    throw new Error("Error al borrar la imagen: " + error.message);
  }
};

const deleteAllImages = async () => {
  try {
    // Eliminar todas las imágenes
    const result = await Imagen.destroy({
      where: {},  // Sin condiciones, se eliminarán todas las imágenes
    });

    if (result === 0) {
      throw new Error("No hay imágenes para borrar");
    }

    return { message: "Todas las imágenes han sido eliminadas" };
  } catch (error) {
    throw new Error("Error al borrar las imágenes: " + error.message);
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
