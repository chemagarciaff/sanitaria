const Cassette = require("../database/models/Cassette");

const getAllCassettes = async () => {
  try {
    return await Cassette.findAll();
  } catch (error) {
    throw new Error("Error al pedir todos los cassettes: " + error.message);
  }
};

const getCassettesById = async (id) => {
  try {
    return await Cassette.findByPk(id);
  } catch (error) {
    throw new Error("Error al pedir un cassette por id: " + error.message);
  }
};

const getCassettesByUser = async (id_user) => {
    try {
      return await Cassette.findAll({
        where:{
            usuarioIdUsu:id_user,
        }});
    } catch (error) {
      throw new Error("Error al pedir un cassette por id: " + error.message);
    }
  };


const createCassette = async (cassetteData) => {
  try {
    return await Cassette.create(cassetteData);
  } catch (error) {
    throw new Error("Error al crear el cassette: " + error.message);
  }
};

const updateCassette = async (id, cassetteData) => {
  try {
    const cassette = await Cassette.findByPk(id);
    if (!cassette) {
      throw new Error("Cassette no encontrado");
    }
    return await cassette.update(cassetteData);
  } catch (error) {
    throw new Error("Error al borrar modificar el cassette: " + error.message);
  }
};

const deleteCassette = async (id) => {
  try {
    const cassette = await Cassette.findByPk(id);
    if (!cassette) {
      throw new Error("El cassette no existe");
    }
    return await cassette.destroy();
  } catch (error) {
    throw new Error("Error al borrar el cassette: " + error.message);
  }
};

module.exports = {
  getAllCassettes,
  getCassettesById,
  getCassettesByUser,
  createCassette,
  updateCassette,
  deleteCassette,

};
