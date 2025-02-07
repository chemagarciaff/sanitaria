const muestraService = require('../services/muestraService');

// Obtener todas las muestras
const getAllMuestras = async (req, res) => {
  try {
    const muestras = await muestraService.getAllMuestras();
    res.status(200).json(muestras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Obtener una muestra por ID
const getMuestraById = async (req, res) => {
  try {
    const { id } = req.params;
    const muestra = await muestraService.getMuestraById(id);
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
    const { idCassette } = req.params;

    const muestra = await muestraService.getMuestrasByCassette(idCassette);
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
    const body = req.body;
    const muestra = await muestraService.createMuestra(body);
    res.status(201).json(muestra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Modificar una muestra existente
const updateMuestra = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedMuestra = await muestraService.updateMuestra(id, body);
        
    if (updatedMuestra) {
          res.status(200).json(updatedMuestra);
        }else{
          res.status(404).json({ message: "Muestra no encontrada" });
        }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar una muestra
const deleteMuestra = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMuestra = await muestraService.deleteMuestra(id);
    if (deletedMuestra) {
      res.status(200).json({ message: "Muestra eliminada" });
    } else {  
      res.status(404).json({ message: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Eliminar todas las muestras
const deleteAllMuestras = async (req, res) => {
  try {
    const deletedMuestras =await muestraService.deleteAllMuestras();
    if(deletedMuestras){
      res.status(204).json({ message: "Muestras eliminadas" });
    }else{  
      res.status(404).json({ message: "Muestras no encontradas" });
    }
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

