const Usuario = require("../database/models/Usuario");
const crypto = require("crypto");
const argon2 = require("argon2");
const enviarCorreo = require("../email");

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

const getUserByEmail = async (email) => {
  try {
    return await Usuario.findOne({
      where: {
        email_usu: email,
      },
    });
  } catch (error) {
    throw new Error("Error al pedir un usuario por correo: " + error.message);
  }
};

const createUser = async (userData) => {
  try {
    return await Usuario.create(userData);
  } catch (error) {
    throw new Error("Error al crear el cliente: " + error.message);
  }
};

const logUser = async (userData) => {
  try {
    return await Usuario.findOne(userData);
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
    return await usuario.destroy();
  } catch (error) {
    throw new Error("Error al borrar el usuario: " + error.message);
  }
};

const deleteAllUsers = async () => {
  try {
    const result = await Usuario.destroy({
      where: {}, 
    });

    if (result === 0) {
      throw new Error("No hay usuarios para borrar");
    }

    return await result;
    
  } catch (error) {
    throw new Error("Error al borrar los usuarios: " + error.message);
  }
};

//manejar la recuperacion de la contraseña
const recuperarPassword = async (usuario) => {
  try {
    // 1. Buscar si el email existe
    if (!usuario) {
      return { success: false, message: "El correo no está registrado" };
    }
    // 2. Generar una nueva contraseña random
    const nuevaPassword = crypto.randomBytes(4).toString('hex');
    const contraseñaHasheada = await argon2.hash(nuevaPassword);
    // 3. Actualizar la BD con la nueva contraseña
    const userActualizado = await updateUser(usuario.id_usu, { password_usu: contraseñaHasheada });
    // 4. Enviar el correo con la nueva contraseña
    const emailEnviado = await enviarCorreo(usuario.email_usu, nuevaPassword);
    if (!emailEnviado) {
      return { success: false, message: "No se pudo enviar el correo" };
    }
    return { success: true, message: "Contraseña restablecida. Revisa tu correo." };
  } catch (error) {
    console.error("Error en el proceso de recuperación:", error);
    return { success: false, message: "Error interno" };
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  logUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  recuperarPassword,
};
