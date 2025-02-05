const muestraController = require('../controllers/muestraService');

// Obtener todas las muestras
const getAllMuestras = async (req, res) => {
  try {
    const muestras = await muestraController.getAllMuestras();
    res.status(200).json(muestras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Obtener una muestra por ID
const getMuestraById = async (req, res) => {
  try {
    const muestra = await muestraController.getMuestraById(req.params.id);
    if (muestra) {
      res.status(200).json(muestra);
    } else {
      res.status(404).json({ message: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Obtener una muestra por cassette
const getMuestrasByCassette = async (req, res) => {
  try {
    const muestra = await muestraController.getMuestrasByCassette(req.params.id);
    if (muestra) {
      res.status(200).json(muestra);
    } else {
      res.status(404).json({ message: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Crear una muestra
const createMuestra = async (req, res) => {
  try {
    const muestra = await muestraController.createMuestra(req.body);
    res.status(201).json(muestra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Modificar una muestra existente
const updateMuestra = async (req, res) => {
  try {
    const updatedMuestra = await muestraController.updateMuestra(
        req.params.id, 
        req.body);
    res.status(200).json(updatedMuestra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar una muestra
const deleteMuestra = async (req, res) => {
  try {
    await muestraController.deleteMuestra(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Eliminar todas las muestras
const deleteAllMuestras = async (req, res) => {
  try {
    await muestraController.deleteAllMuestras();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMuestras,
  getMuestraById,
  getMuestrasByCassette,
  createMuestra,
  updateMuestra,
  deleteMuestra,
  deleteAllMuestras,
};

