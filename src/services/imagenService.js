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

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
};
