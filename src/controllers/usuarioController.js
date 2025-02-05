const usuarioService = require("./../services/usuarioService");

// Obtener todos los clientes
const getAllUsers = async (req, res) => {
  try {
    const users = await usuarioService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cliente por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usuarioService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo cliente
const createUser = async (req, res) => {
  try {
    const body = req.body;
    const createdUser = await usuarioService.createUser(body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un cliente existente
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedUser = await usuarioService.updateUser(id, body);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un cliente
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await usuarioService.deleteUser(id);
    
    if (deletedUser) {
      res.status(204).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un Usuario
const deleteAllUsers = async (req, res) => {
  try {

    const deletedUsers = await usuarioService.deleteAllUser();

    if (deletedUsers) {
      res.status(204).json({ message: "Usuarios eliminados" });
    } else {
      res.status(404).json({ message: "Usuarios no encontrados" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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

