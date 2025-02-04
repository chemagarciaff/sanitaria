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
    const user = await usuarioService.getClientById(req.params.id);
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
    const createdUser = await usuarioService.createUser(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un cliente existente
const updateUser = async (req, res) => {
  try {
    const updatedUser = await usuarioService.updateUser(
      req.params.id,
      req.body
    );
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
    const deletedUser = await usuarioService.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(204).json({ message: "Cliente eliminado" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
