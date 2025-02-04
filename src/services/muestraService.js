const Muestra = require("../database/models/Muestra");

const getAllMuestras = async () => {
  try {
    return await Muestra.findAll();
  } catch (error) {
    throw new Error("Error al pedir todas los Muestras: " + error.message);
  }
};

const getMuestraById = async (id) => {
  try {
    return await Muestra.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un Muestras por id: " + error.message);
  }
};

const getMuestrasByCassette = async (id_cassette) => {
    try {
      return await Muestra.findAll({
        where:{
            cassetteIdCassette:id_cassette,
        }});
    } catch (error) {
      throw new Error("Error al pedir una muestra por cassette: " + error.message);
    }
  };


const createMuestra = async (muestraData) => {
  try {
    return await Muestra.create(muestraData);
  } catch (error) {
    throw new Error("Error al crear una muestra: " + error.message);
  }
};

const updateMuestra = async (id, muestraData) => {
  try {
    const Muestras = await Muestras.findByPk(id);
    if (!Muestras) {
      throw new Error("Muestra no encontrada");
    }
    return await Muestras.update(muestraData);
  } catch (error) {
    throw new Error("Error al borrar modificar el Muestras: " + error.message);
  }
};

const deleteMuestra = async (id) => {
  try {
    const Muestras = await Muestras.findByPk(id);
    if (!Muestras) {
      throw new Error("La muestra no existe");
    }
    return await Muestras.destroy();
  } catch (error) {
    throw new Error("Error al borrar las muestras: " + error.message);
  }
};

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
