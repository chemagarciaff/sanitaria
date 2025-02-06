const cassetteService = require("./../services/cassetteService");

// Obtener todos los cassettes
const getAllCassettes = async (req, res) => {
  try {
    const cassettes = await cassetteService.getAllCassettes();
    res.status(200).json(cassettes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cassette por ID
const getCassettesById = async (req, res) => {
  try {
    const {id} = req.params;
    const cassette = await cassetteService.getCassettesById(id);
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
      const {id} = req.params;  
      const cassette = await cassetteService.getCassettesByUser(id);
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
    const {organo} = req.params;
    const cassette = await cassetteService.getCassettesByOrgano(organo);
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
    const {fecha} = req.params;
    const cassette = await cassetteService.getCassettesByFecha(fecha);
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
    const {fechaInicio, fechaFin} = req.params;

    const cassette = await cassetteService.getCassettesBetweenFecha(fechaInicio, fechaFin);
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
    const body = req.body;
    const createdCassette = await cassetteService.createCassette(body);
    res.status(201).json(createdCassette);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un cassette existente
const updateCassette = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedCassette = await cassetteService.updateCassette(
      id,body
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
    const { id } = req.params;
    const cassette = await cassetteService.deleteCassette(id);
    if (cassette) {
      res.status(200).json({ message: "Cassette eliminado" });
    } else {
      res.status(404).json({ message: "Cassette no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Eliminar todos los cassettes
const deleteAllCassettes = async (req, res) => {
  try {
    const cassette = await cassetteService.deleteAllCassettes();
    if (cassette) {
      res.status(200).json({ message: "Cassettes eliminados" });
    } else {
      res.status(404).json({ message: "Cassettes no encontrados" });
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
  deleteAllCassettes
};
