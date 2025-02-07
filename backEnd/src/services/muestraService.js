const Muestra = require("../database/models/Muestra");
//Obtener todas las muestras
const getAllMuestras = async () => {
  try {
    return await Muestra.findAll();
  } catch (error) {
    throw new Error("Error al pedir todas los Muestras: " + error.message);
  }
};
//Obtener una muestra por ID
const getMuestraById = async (id) => {
  try {
    return await Muestra.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un Muestras por id: " + error.message);
  }
};
//Obtener una muestra por cassette
const getMuestrasByCassette = async (idCassette) => {
    try {
      return await Muestra.findAll({
        where:{
            cassetteIdCassette: idCassette,
        }});
    } catch (error) {
      throw new Error("Error al pedir una muestra por cassette: " + error.message);
    }
  };

//Crear una muestra
const createMuestra = async (muestraData) => {
  try {
    return await Muestra.create(muestraData);
  } catch (error) {
    throw new Error("Error al crear una muestra: " + error.message);
  }
};
//Modificar una muestra
const updateMuestra = async (id, muestraData) => {
  try {
    const muestra = await Muestra.findByPk(id);
    if (!muestra) {
      throw new Error("Muestra no encontrada");
    }
    return await muestra.update(muestraData);
  } catch (error) {
    throw new Error("Error al modificar la muestra: " + error.message);
  }
};
//Eliminar una muestra
const deleteMuestra = async (id) => {
  try {
    const muestra = await Muestra.findByPk(id);
    if (!muestra) {
      throw new Error("La muestra no existe");
    }
    return await muestra.destroy();
  } catch (error) {
    throw new Error("Error al borrar la muestra: " + error.message);
  }
};
//Eliminar todas las muestras
const deleteAllMuestras = async () =>{
    try {
        const result = await Muestra.destroy({
            where:{
            }
        })
        if (result===0){
            throw new Error ("No existen muestras para eliminar.")
        }
        return {
            message: "Todas las muestras han sido eliminadas."
        }
    } catch (error) {
        throw new Error ("No existen muestras para eliminar."+ error.message)
    }

}

module.exports = {
  getAllMuestras,
  getMuestraById,
  getMuestrasByCassette,
  createMuestra,
  updateMuestra,
  deleteMuestra,
  deleteAllMuestras
};
