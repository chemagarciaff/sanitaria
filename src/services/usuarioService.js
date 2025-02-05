const Usuario = require("../database/models/Usuario");

const getAllUsers = async () => {
  try {
    return await Usuario.findAll();
  } catch (error) {
    throw new Error("Error al pedir todos los usuarios: " + error.message);
  }
};

const getUserById = async (id) => {
  try {
    return await Usuario.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un usuario por id: " + error.message);
  }
};

const createUser = async (userData) => {
  try {
    return await Usuario.create(userData);
  } catch (error) {
    throw new Error("Error al crear el cliente: " + error.message);
  }
};

const updateUser = async (id, userData) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return await usuario.update(userData);
  } catch (error) {
    throw new Error("Error al borrar modificar el usuario: " + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error("El usuario no existe");
    }
    return await cliente.destroy();
  } catch (error) {
    throw new Error("Error al borrar el usuario: " + error.message);
  }
};

const deleteAllUsers = async () => {
  try {
    // Eliminar todas las imágenes
    const result = await Usuario.destroy({
      where: {},  // Sin condiciones, se eliminarán todas las imágenes
    });

    if (result === 0) {
      throw new Error("No hay usuarios para borrar");
    }

    return { message: "Todos los usuarios han sido eliminados" };
  } catch (error) {
    throw new Error("Error al borrar los usuarios: " + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
