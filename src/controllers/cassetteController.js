const cassetteController = require("./../services/cassetteService");

// Obtener todos los cassettes
const getAllCassettes = async (req, res) => {
  try {
    const cassettes = await cassetteController.getAllCassettes();
    res.status(200).json(cassettes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cassette por ID
const getCassettesById = async (req, res) => {
  try {
    const cassette = await cassetteController.getCassettesById(req.params.id);
    if (cassette) {
      res.status(200).json(cassette);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cassette por Usuario
const getCassettesByUser = async (req, res) => {
    try {
      const cassette = await cassetteController.getCassettesByUser(req.params.id);
      if (cassette) {
        res.status(200).json(cassette);
      } else {
        res.status(404).json({ message: "Cassette no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Crear un nuevo cassette
const createClient = async (req, res) => {
  try {
    const createdClient = await cassetteController.createClient(req.body);
    res.status(201).json(createdClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un cliente existente
const updateClient = async (req, res) => {
  try {
    const updatedClient = await cassetteController.updateClient(
      req.params.id,
      req.body
    );
    if (updatedClient) {
      res.status(200).json(updatedClient);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un cliente
const deleteClient = async (req, res) => {
  try {
    const deleted = await cassetteController.deleteClient(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Cliente eliminado" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCassettes,
  getCassettesById,
  getCassettesByUser,
  createClient,
  updateClient,
  deleteClient,
};
