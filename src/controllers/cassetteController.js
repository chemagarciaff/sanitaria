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

// Obtener un cassette por Organo
const getCassettesByOrgano = async (req, res) => {
  try {
    const cassette = await cassetteController.getCassettesByOrgano(req.params.id);
    if (cassette) {
      res.status(200).json(cassette);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cassette por Fecha
const getCassettesByFecha = async (req, res) => {
  try {
    const cassette = await cassetteController.getCassettesByFecha(req.params.id);
    if (cassette) {
      res.status(200).json(cassette);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cassette entre fechas
const getCassettesBetweenFecha = async (req, res) => {
  try {
    const cassette = await cassetteController.getCassettesBetweenFecha(req.params.id);
    if (cassette) {
      res.status(200).json(cassette);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Crear un cassette
const createCassette = async (req, res) => {
  try {
    const createdCassette = await cassetteController.createCassette(req.body);
    res.status(201).json(createdCassette);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un cassette existente
const updateCassette = async (req, res) => {
  try {
    const updatedCassette = await cassetteController.updateCassette(
      req.params.id,
      req.body
    );
    if (updatedCassette) {
      res.status(200).json(updatedCassette);
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Borrar un cassette
const deleteCassette = async (req, res) => {
  try {
    const cassette = await cassetteController.deleteCassette(req.params.id);
    if (cassette) {
      res.status(200).json({ message: "Cassette eliminado" });
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCassettes,
  getCassettesById,
  getCassettesByUser,
  getCassettesByOrgano,
  getCassettesByFecha,
  getCassettesBetweenFecha,
  createCassette,
  updateCassette,
  deleteCassette,
};
